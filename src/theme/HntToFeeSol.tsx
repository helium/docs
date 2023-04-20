import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import axios from 'axios'
import React, { useState } from 'react'
import { useAsyncCallback } from 'react-async-hook'
import './bufferFill'
import { Alert, AlertIcon } from './components/Alert'
import { Button } from './components/Button'
import { Flex } from './components/Flex'
import { Wallet, WrapWithAccountProvider } from './components/Wallet'
import { Transaction } from '@solana/web3.js'
import { sendAndConfirmWithRetry } from '@helium/spl-utils'
import { Checkbox } from './components/Checkbox'

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css')

export const HntToFeeSolImpl = () => {
  const { siteConfig } = useDocusaurusContext()
  const migrationUrl = siteConfig.customFields.MIGRATION_SERVICE_URL
  const { publicKey, wallet } = useWallet()
  const { connection } = useConnection()
  const { execute, error, loading } = useAsyncCallback(async () => {
    if (wallet && connection && wallet.adapter && wallet.adapter.connected) {
      const txRaw = (await axios.post(`${migrationUrl}/hnt-to-fees`, {
        wallet: publicKey.toBase58()
      })).data
      const tx = Transaction.from(Buffer.from(txRaw))
      const signed = await wallet.adapter.signTransaction(tx)
      await sendAndConfirmWithRetry(
        connection,
        signed.serialize(),
        {
          skipPreflight: true,
        },
        'confirmed',
      )
    }
  })
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Flex flexDirection="column" mt={5}>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <p>{error.message}</p>
        </Alert>
      )}
      I agree to use the SOL acquired from this system solely for on-chain rent, gas, and other
      transaction fees. I understand that the terms of service limit each user to a maximum of 100
      uses of this system. I further agree that I will not use this system for any illegal purpose.
      <Checkbox onChange={() => setIsChecked((c) => !c)}>I Agree</Checkbox>
      <Button isDisabled={!isChecked} colorScheme="primary" isLoading={loading} onClick={execute}>
        {loading ? 'Loading' : 'Convert HNT to 0.02 SOL for tx fees'}
      </Button>
    </Flex>
  )
}

export const HntToFeeSol = () => {
  return (
    <Wallet>
      <WrapWithAccountProvider>
        <HntToFeeSolImpl />
      </WrapWithAccountProvider>
    </Wallet>
  )
}
