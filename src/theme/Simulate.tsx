import { type Adapter } from '@solana/wallet-adapter-base'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import {
  Connection,
  Transaction,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js'
import React, { useEffect } from 'react'
import { useAsyncCallback } from 'react-async-hook'
import './bufferFill'
import { Button } from './components/Button'
import { Flex } from './components/Flex'
import { Wallet, WrapWithAccountProvider } from './components/Wallet'

require('@solana/wallet-adapter-react-ui/styles.css')

export const SimulateImpl = ({
  getInstructions,
}: {
  getInstructions: (args: {
    publicKey: PublicKey
    connection: Connection
    wallet: Adapter
  }) => Promise<{ transactions?: Transaction[]; instructions?: TransactionInstruction[][] }>
}) => {
  const { publicKey, wallet } = useWallet()
  const { connection } = useConnection()

  const { execute, error, loading } = useAsyncCallback(async () => {
    if (wallet && connection && wallet.adapter && wallet.adapter.connected) {
      const blockhash = (await connection.getLatestBlockhash()).blockhash
      const { transactions, instructions } = await getInstructions({
        connection,
        wallet: wallet.adapter,
        publicKey,
      })
      let txs = transactions
      if (instructions) {
        txs = instructions.map((ix) => {
          const transaction = new Transaction({
            recentBlockhash: blockhash,
            feePayer: publicKey,
          })
          transaction.add(...ix)
          return transaction
        })
      }

      await wallet.adapter.signAllTransactions(txs)
    }
  })

  useEffect(() => {
    if (error) {
      console.error(error)
    }
  }, [error])

  if (!publicKey) {
    return null
  }
  return (
    <Flex flexDirection="column" mt={5}>
      {error && error.message}
      <Button colorScheme="primary" isLoading={loading} onClick={execute}>
        {loading ? 'Loading' : `Preview Transaction`}
      </Button>
    </Flex>
  )
}

export const Simulate = ({
  getInstructions,
}: {
  getInstructions: (args: {
    publicKey: PublicKey
    connection: Connection
    wallet: Adapter
  }) => Promise<{ transactions?: Transaction[]; instructions?: TransactionInstruction[][] }>
}) => {
  return (
    <Wallet>
      <WrapWithAccountProvider>
        <SimulateImpl getInstructions={getInstructions} />
      </WrapWithAccountProvider>
    </Wallet>
  )
}
