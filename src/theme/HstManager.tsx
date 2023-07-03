import { ClockworkProvider } from '@clockwork-xyz/sdk'
import { AnchorProvider, BN, Program } from '@coral-xyz/anchor'
import {
  PROGRAM_ID,
  fanoutKey,
  init,
  membershipCollectionKey,
  membershipVoucherKey,
} from '@helium/fanout-sdk'
import { useIdlAccount, useTokenAccount } from '@helium/helium-react-hooks'
import { Fanout } from '@helium/idls/lib/types/fanout'
import { HNT_MINT, searchAssets, sendInstructions, toNumber } from '@helium/spl-utils'
import {
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js'
import React, { useEffect, useMemo } from 'react'
import { useAsync, useAsyncCallback } from 'react-async-hook'
import './bufferFill'
import { Alert, AlertIcon } from './components/Alert'
import { Button } from './components/Button'
import { Flex } from './components/Flex'
import { Wallet, WrapWithAccountProvider } from './components/Wallet'

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css')

export const HstManagerImpl = ({ idl }: { idl: Fanout }) => {
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
      if (assets) {
        return assets[0]
      }
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
  const { info: fanout } = useIdlAccount<Fanout>(fanoutK, idl as Fanout, 'FanoutV0')
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

function threadKey(authority: PublicKey, threadId: string): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('thread', 'utf8'), authority.toBuffer(), Buffer.from(threadId, 'utf8')],
    new PublicKey('CLoCKyJ6DXBJqqu2VWx9RLbgnwwR6BMHHuyasVmfMzBh'),
  )
}

export const WrapWithIdl = () => {
  const { wallet } = useWallet()
  const { connection } = useConnection()
  const { result: idl } = useAsync(async () => {
    return await Program.fetchIdl(PROGRAM_ID, new AnchorProvider(connection, wallet.adapter, {}))
  }, [])

  if (idl) {
    return <HstManagerImpl idl={idl as Fanout} />
  }

  return <div />
}

export const HstManager = () => {
  return (
    <Wallet>
      <WrapWithAccountProvider>
        <WrapWithIdl />
      </WrapWithAccountProvider>
    </Wallet>
  )
}
