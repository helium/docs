import { ClockworkProvider } from '@clockwork-xyz/sdk'
import { AnchorProvider, BN } from '@coral-xyz/anchor'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { fanoutKey, init, membershipCollectionKey, membershipVoucherKey } from '@helium/fanout-sdk'
import { AccountProvider, useIdlAccount, useTokenAccount } from '@helium/helium-react-hooks'
import { IDL } from '@helium/idls/fanout'
import { Fanout } from '@helium/idls/lib/types/fanout'
import { HNT_MINT, searchAssets, sendInstructions, toNumber } from '@helium/spl-utils'
import {
  createInitializeMintInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { LedgerWalletAdapter } from '@solana/wallet-adapter-ledger'
import {
  ConnectionProvider,
  useConnection,
  useWallet,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js'
import React, { useEffect, useMemo } from 'react'
import { useAsync, useAsyncCallback } from 'react-async-hook'
import './bufferFill'
import { Alert, AlertIcon } from './components/Alert'
import { Button } from './components/Button'
import { Flex } from './components/Flex'

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css')

export const HstManagerImpl = () => {
  const { publicKey, wallet } = useWallet()
  const fanoutK = useMemo(() => fanoutKey('HST')[0], [])
  const collectionAddress = useMemo(() => membershipCollectionKey(fanoutK)[0], [fanoutK])
  const { connection } = useConnection()
  const { result: stakedPosition, error: fetchErr } = useAsync(async () => {
    if (publicKey && collectionAddress) {
      const assets = await searchAssets(connection.rpcEndpoint, {
        grouping: ['collection', collectionAddress.toBase58()],
        ownerAddress: publicKey?.toBase58(),
        creatorAddress: null,
      })
      return assets[0]
    }

    return undefined
  }, [publicKey, collectionAddress, connection.rpcEndpoint])

  useEffect(() => {
    if (fetchErr) {
      console.error(fetchErr)
    }
  }, [fetchErr])

  const voucher = useMemo(
    () => stakedPosition && membershipVoucherKey(stakedPosition.id)[0],
    [stakedPosition],
  )

  const { result: fanoutProgram } = useAsync(async () => {
    if (wallet && connection && wallet.adapter && wallet.adapter.connected) {
      return await init(new AnchorProvider(connection, wallet.adapter, { commitment: 'confirmed' }))
    }
  }, [wallet, connection])

  const { info: fanout } = useIdlAccount<Fanout>(fanoutK, IDL as Fanout, 'fanoutV0')
  const hst = useMemo(() => fanout && fanout.membershipMint, [fanout])
  const stakeAccountKey = useMemo(
    () => voucher && hst && getAssociatedTokenAddressSync(hst, voucher, true),
    [voucher, hst],
  )
  const currAccountKey = useMemo(
    () => publicKey && hst && getAssociatedTokenAddressSync(hst, publicKey, true),
    [hst, publicKey],
  )

  const clockworkProvider = useMemo(
    () =>
      wallet &&
      wallet.adapter &&
      wallet.adapter.connected &&
      connection &&
      new ClockworkProvider(wallet.adapter, connection),
    [wallet, connection],
  )
  const { info: stakeAccount, loading: loadingTokenAccount } = useTokenAccount(stakeAccountKey)
  const { info: currAccount, loading: loadingCurrAccount } = useTokenAccount(currAccountKey)
  const { execute, loading, error } = useAsyncCallback(async () => {
    const name = fanout.name
    const mintKeypair = Keypair.generate()
    const mint = stakedPosition ? stakedPosition.id : mintKeypair.publicKey
    const threadId = `${name}-${mint.toBase58().slice(0, 8)}`
    const [thread] = threadKey(publicKey, threadId)

    if (!(publicKey && fanoutK && hst && currAccountKey)) {
      throw new Error('Wallet not connected')
    }

    async function craftDistribute(payer: PublicKey) {
      return await fanoutProgram.methods.distributeV0().accounts({
        payer: payer,
        fanout: fanoutK,
        mint: HNT_MINT,
        owner: publicKey,
      })
    }

    if (stakeAccount && stakeAccount.amount > 0) {
      const threadExists = await connection.getAccountInfo(thread)
      const preInstructions = []
      if (threadExists) {
        preInstructions.push(await clockworkProvider.threadDelete(publicKey, thread))
      }

      preInstructions.push(await (await craftDistribute(publicKey)).instruction())

      // Unstake
      await fanoutProgram.methods
        .unstakeV0()
        .preInstructions(preInstructions)
        .accounts({
          mint: stakedPosition.id,
          solDestination: publicKey,
          voucherAuthority: publicKey,
        })
        .rpc({ skipPreflight: true })
    } else {
      // Stake
      const threadExists = await connection.getAccountInfo(thread)
      const preInstructions = []
      // Create daily trigger thread
      const trigger = {
        cron: {
          schedule: '0 0 30 * * * *',
          skippable: true,
        },
      }

      const voucher = membershipVoucherKey(mintKeypair.publicKey)[0]

      preInstructions.push(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: 82,
          lamports: await connection.getMinimumBalanceForRentExemption(82),
          programId: TOKEN_PROGRAM_ID,
        }),
        await createInitializeMintInstruction(mintKeypair.publicKey, 0, voucher, voucher),
      )
      await fanoutProgram.methods
        .stakeV0({
          amount: new BN(currAccount.amount.toString()),
        })
        .preInstructions(preInstructions)
        .accounts({
          fanout: fanoutK,
          recipient: publicKey,
          mint: mintKeypair.publicKey,
        })
        .signers([mintKeypair])
        .rpc({ skipPreflight: true })

      if (!threadExists) {
        await sendInstructions(fanoutProgram.provider as AnchorProvider, [
          await clockworkProvider.threadCreate(
            publicKey, // authority
            threadId, // id
            [
              await (
                await craftDistribute(new PublicKey('C1ockworkPayer11111111111111111111111111111'))
              ).instruction(),
            ], // instructions
            trigger, // trigger
            LAMPORTS_PER_SOL / 10,
          ),
        ])
      }
    }
  })

  if (error) {
    console.error(error)
  }

  return (
    <Flex flexDirection="column" mt={5}>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <p>{error.message}</p>
        </Alert>
      )}
      <Button
        colorScheme="primary"
        isLoading={loadingTokenAccount || loadingCurrAccount || loading}
        onClick={execute}
        isDisabled={!(stakeAccount && stakeAccount.amount) && !(currAccount && currAccount.amount)}
      >
        {loadingTokenAccount
          ? 'Loading'
          : stakeAccount && stakeAccount.amount > 0
          ? `Unstake ${toNumber(stakeAccount.amount, 8).toFixed(2).toString()}`
          : currAccount && currAccount.amount
          ? `Stake ${toNumber(currAccount.amount, 8).toFixed(2).toString()}`
          : 'No HST'}
      </Button>
    </Flex>
  )
}

function threadKey(
  authority: PublicKey,
  threadId: string,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('thread', 'utf8'), authority.toBuffer(), Buffer.from(threadId, 'utf8')],
    new PublicKey('CLoCKyJ6DXBJqqu2VWx9RLbgnwwR6BMHHuyasVmfMzBh'),
  )
}

export const WrapWithAccountProvider: React.FC = ({ children }) => {
  const { connection } = useConnection()
  return (
    <AccountProvider connection={connection} commitment="confirmed">
      {children}
    </AccountProvider>
  )
}

export const HstManager = () => {
  return (
    <ClientOnly>
      <Wallet>
        <WrapWithAccountProvider>
          <HstManagerImpl />
        </WrapWithAccountProvider>
      </Wallet>
    </ClientOnly>
  )
}

const Wallet: React.FC = ({ children }: { children: any }) => {
  const { siteConfig } = useDocusaurusContext()
  const endpoint = siteConfig.customFields.SOLANA_URL!

  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/solana-labs/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      // Phantom and backpack already supported in wallet standard, so they should show up.
      new LedgerWalletAdapter()
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endpoint],
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton style={{ marginRight: '12px' }} />
          {/* Your app's components go here, nested within the context providers. */}
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

function ClientOnly({ children }) {
  if (typeof window === 'undefined') {
    return null
  }

  return children
}
