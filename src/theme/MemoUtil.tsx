import { AnchorProvider } from '@coral-xyz/anchor'
import { sendAndConfirmWithRetry, batchInstructionsToTxsWithPriorityFee } from '@helium/spl-utils'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js'
import React, { useState, useMemo } from 'react'
import { useAsyncCallback } from 'react-async-hook'
import './bufferFill'
import { Alert, AlertIcon } from './components/Alert'
import { Button } from './components/Button'
import { Flex } from './components/Flex'
import { Wallet, WrapWithAccountProvider } from './components/Wallet'

require('@solana/wallet-adapter-react-ui/styles.css')

const MEMO_MAX_BYTES = 566

const encodeMemoString = (utf8Input: string | undefined): string | undefined => {
  if (!utf8Input) return undefined
  const buff = Buffer.from(utf8Input, 'utf8')
  return buff.toString('base64')
}

const getMemoStrValid = (memoStr?: string) => {
  const base64Memo = encodeMemoString(memoStr)
  if (!base64Memo) {
    return { valid: true, bytesRemaining: MEMO_MAX_BYTES, bytesUsed: 0 }
  }
  const buff = Buffer.from(base64Memo, 'base64')
  const size = buff.byteLength
  return {
    valid: size <= MEMO_MAX_BYTES,
    bytesRemaining: MEMO_MAX_BYTES - size,
    bytesUsed: size,
  }
}

export const MemoUtilImpl = () => {
  const [sig, setSig] = useState('')
  const [memo, setMemo] = useState('')
  const { publicKey, wallet } = useWallet()
  const { connection } = useConnection()
  const memoValidation = useMemo(() => getMemoStrValid(memo), [memo])
  const isMemoValid = memoValidation.valid

  const { execute, error, loading } = useAsyncCallback(async () => {
    if (!isMemoValid) {
      throw new Error('Memo exceeds the maximum allowed size of 8 bytes.')
    }

    if (wallet && connection && wallet.adapter && wallet.adapter.connected) {
      const encodedMemo = encodeMemoString(memo)
      if (!encodedMemo) {
        throw new Error('Failed to encode memo.')
      }

      const memoProgramId = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr')
      const memoInstruction = new TransactionInstruction({
        keys: [],
        programId: memoProgramId,
        data: Buffer.from(memo, 'utf8'), // Memo data as UTF-8
      })

      const transaction = (
        await batchInstructionsToTxsWithPriorityFee(
          new AnchorProvider(connection, { ...wallet.adapter, publicKey } as any, {
            skipPreflight: true,
            commitment: 'confirmed',
          }),
          [memoInstruction],
        )
      )[0]

      const { blockhash } = await connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = publicKey

      const signedTransaction = await wallet.adapter.signTransaction(transaction)
      const signature = await sendAndConfirmWithRetry(
        connection,
        signedTransaction.serialize(),
        {
          skipPreflight: true,
        },
        'confirmed',
      )

      console.log('Transaction Signature:', signature)
      setSig(signature.txid)
    } else {
      throw new Error('Wallet not connected.')
    }
  })

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value)
  }

  return (
    <div className="display-legacy-wallet font-disable-calt">
      {error && (
        <Alert status="error">
          <AlertIcon />
          <p>{error.message}</p>
        </Alert>
      )}

      {sig && (
        <Alert status="success">
          <AlertIcon />
          <p>Memo transcribed successfully! Signature: {sig}</p>
        </Alert>
      )}

      <Flex flexDirection="column" mb={2}>
        <label htmlFor="memo" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
          Memo
        </label>
        <input
          id="memo"
          style={{
            display: 'flex',
            borderRadius: '4px',
            margin: '8px 0',
            border: '1px solid #ccc',
            boxShadow: 'inset 0 1px 3px #ddd',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '12px',
            paddingBottom: '12px',
            width: '100%',
            boxSizing: 'border-box',
          }}
          type="text"
          name="memo"
          placeholder="Enter your memo (max 566 bytes)"
          value={memo}
          onChange={handleMemoChange}
        />
        <div style={{ marginTop: '4px', fontSize: '12px', color: isMemoValid ? 'green' : 'red' }}>
          {isMemoValid
            ? `Bytes Remaining: ${memoValidation.bytesRemaining}`
            : `Memo is too long by ${-memoValidation.bytesRemaining} bytes.`}
        </div>
      </Flex>

      <Flex flexDirection="column" mb={2}>
        <Button
          isDisabled={!memo || !isMemoValid}
          colorScheme="primary"
          isLoading={loading}
          onClick={execute}
        >
          {loading ? 'Transcribing...' : 'Transcribe Memo'}
        </Button>
      </Flex>

      {!publicKey && (
        <p style={{ marginTop: '16px', textAlign: 'center' }}>
          Connect your wallet to transcribe a memo to the Solana blockchain.
        </p>
      )}
    </div>
  )
}

export const MemoUtil = () => {
  return (
    <Wallet>
      <WrapWithAccountProvider>
        <MemoUtilImpl />
      </WrapWithAccountProvider>
    </Wallet>
  )
}
