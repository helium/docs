import './bufferFill'
import { ClockworkProvider } from '@clockwork-xyz/sdk'
import { AnchorProvider, BN } from '@coral-xyz/anchor'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { AccountProvider, useIdlAccount, useTokenAccount } from '@helium/helium-react-hooks'
import {
  fanoutConfigForMintKey,
  fanoutConfigKey,
  init,
  membershipMintVoucherKey,
  membershipVoucherKey,
  Hydra,
  IDL,
} from '@helium/hydra-sdk'
import { HNT_MINT, toNumber } from '@helium/spl-utils'
import {
  createAssociatedTokenAccountIdempotentInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token'
import {
  ConnectionProvider,
  useConnection,
  useWallet,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import React, { useMemo } from 'react'
import { useAsync, useAsyncCallback } from 'react-async-hook'
import { Alert, AlertIcon } from './components/Alert'
import { Button } from './components/Button'
import { Flex } from './components/Flex'

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css')

export const HstManagerImpl = () => {
  const { publicKey, wallet } = useWallet()
  const fanoutConfig = useMemo(() => fanoutConfigKey('HST')[0], [])
  const voucher = useMemo(
    () => publicKey && membershipVoucherKey(fanoutConfig, publicKey)[0],
    [fanoutConfig, publicKey],
  )

  const { connection } = useConnection()
  const { result: hydraProgram } = useAsync(async () => {
    if (wallet && connection && wallet.adapter) {
      return await init(new AnchorProvider(connection, wallet.adapter, { commitment: 'confirmed' }))
    }
  }, [wallet, connection])

  const { info: fanout } = useIdlAccount<Hydra>(fanoutConfig, IDL as Hydra, 'fanout')
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
      wallet && wallet.adapter && connection && new ClockworkProvider(wallet.adapter, connection),
    [wallet, connection],
  )
  const { info: stakeAccount, loading: loadingTokenAccount } = useTokenAccount(stakeAccountKey)
  const { info: currAccount, loading: loadingCurrAccount } = useTokenAccount(currAccountKey)
  const { execute, loading, error } = useAsyncCallback(async () => {
    const name = fanout.name
    const threadId = `${name}-${publicKey.toBase58().slice(0, 8)}`
    const [thread] = threadKey(publicKey, threadId)

    if (!(publicKey && fanoutConfig && hst && currAccountKey && stakeAccountKey)) {
      throw new Error('Wallet not connected')
    }

    async function craftDistribute(payer: PublicKey) {
      const [fanoutConfigForMint] = fanoutConfigForMintKey(fanoutConfig, HNT_MINT)
      return await hydraProgram.methods.processDistributeToken(true).accounts({
        payer: payer,
        member: publicKey,
        fanout: fanoutConfig,
        holdingAccount: getAssociatedTokenAddressSync(HNT_MINT, fanoutConfig, true),
        fanoutForMint: fanoutConfigForMint,
        fanoutMint: HNT_MINT,
        fanoutMintMemberTokenAccount: getAssociatedTokenAddressSync(HNT_MINT, publicKey),
        memberStakeAccount: stakeAccountKey,
        membershipMint: hst,
        fanoutForMintMembershipVoucher: membershipMintVoucherKey(
          fanoutConfigForMint,
          publicKey,
          HNT_MINT,
        )[0],
      })
    }

    if (stakeAccount && stakeAccount.amount > 0) {
      const preInstructions = [
        await createAssociatedTokenAccountIdempotentInstruction(
          publicKey,
          getAssociatedTokenAddressSync(hst, publicKey),
          publicKey,
          hst,
        ),
      ]
      const threadExists = await connection.getAccountInfo(thread)
      if (threadExists) {
        preInstructions.push(await clockworkProvider.threadDelete(publicKey, thread))
      }

      preInstructions.push(await (await craftDistribute(publicKey)).instruction())

      // Unstake
      await hydraProgram.methods
        .processUnstake()
        .preInstructions(preInstructions)
        .accounts({
          member: publicKey,
          fanout: fanoutConfig,
          membershipMint: hst,
          membershipMintTokenAccount: currAccountKey,
          memberStakeAccount: stakeAccountKey,
        })
        .rpc({ skipPreflight: true })

      // Suspend trigger thread
      if (await connection.getAccountInfo(thread)) {
      }
    } else {
      // Stake
      const threadExists = await connection.getAccountInfo(thread)
      const preInstructions = [
        await createAssociatedTokenAccountIdempotentInstruction(
          publicKey,
          stakeAccountKey,
          voucher,
          hst,
        ),
      ]
      // Create daily trigger thread
      const trigger = {
        cron: {
          schedule: '30 00 * * * * *',
          skippable: true,
        },
      }
      if (!threadExists) {
        preInstructions.push(
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
        )
      }
      await hydraProgram.methods
        .processSetForTokenMemberStake(new BN(currAccount.amount.toString()))
        .preInstructions(preInstructions)
        .accounts({
          authority: publicKey,
          member: publicKey,
          fanout: fanoutConfig,
          membershipMint: hst,
          membershipMintTokenAccount: currAccountKey,
          memberStakeAccount: stakeAccountKey,
        })
        .rpc({ skipPreflight: true })
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

const CLOCKWORK_PID = new PublicKey('CLoCKyJ6DXBJqqu2VWx9RLbgnwwR6BMHHuyasVmfMzBh')
function threadKey(
  authority: PublicKey,
  threadId: string,
  programId: PublicKey = CLOCKWORK_PID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('thread', 'utf8'), authority.toBuffer(), Buffer.from(threadId, 'utf8')],
    programId,
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
    <Wallet>
      <WrapWithAccountProvider>
        <HstManagerImpl />
      </WrapWithAccountProvider>
    </Wallet>
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
