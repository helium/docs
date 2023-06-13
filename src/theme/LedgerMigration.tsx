import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { bulkSendRawTransactions } from '@helium/spl-utils'
import { LedgerWalletAdapter } from '@solana/wallet-adapter-ledger'
import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import axios from 'axios'
import React, { useMemo, useState } from 'react'
import { useAsyncCallback } from 'react-async-hook'
import { FaCheck, FaCheckCircle } from 'react-icons/fa'
import './LedgerMigration.css'
import './bufferFill'
import { Alert, AlertIcon } from './components/Alert'
import { Button } from './components/Button'
import { Checkbox } from './components/Checkbox'
import { Flex } from './components/Flex'
import { Icon } from './components/Icon'

const Text: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  return <p>{children}</p>
}

const Heading: React.FunctionComponent<{
  textAlign?: string
  fontSize?: string
  children: React.ReactNode
}> = ({ children, fontSize, textAlign }) => {
  // @ts-ignore
  return <header style={{ fontSize, textAlign }}>{children}</header>
}

const Input: React.FunctionComponent<{
  type?: string
  name?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  children?: React.ReactNode
  step?: string
  w?: string
}> = ({ children, w, step, type, name, placeholder, value, onChange }) => {
  return (
    <input
      style={{
        borderRadius: '4px',
        margin: '8px 0',
        border: '1px solid #ccc',
        boxShadow: 'inset 0 1px 3px #ddd',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '12px',
        paddingBottom: '12px',
        width: w || '100%',
      }}
      step={step}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >
      {children}
    </input>
  )
}

const VStack: React.FunctionComponent<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      {children}
    </div>
  )
}

const BIP32_HARDENED_BIT = (1 << 31) >>> 0

function harden(n: number): number {
  return (n | BIP32_HARDENED_BIT) >>> 0
}

function getHeliumDerivationPath(account: number = 0, change: number = 0): Buffer {
  const length = 5
  const derivationPath = Buffer.alloc(1 + length * 4)

  let offset = derivationPath.writeUInt8(length, 0)
  offset = derivationPath.writeUInt32BE(harden(44), offset) // Using BIP44
  offset = derivationPath.writeUInt32BE(harden(904), offset) // Helium's BIP44 path

  // if (account !== undefined) {
  offset = derivationPath.writeUInt32BE(harden(account), offset)
  // if (change !== undefined) {
  offset = derivationPath.writeUInt32BE(harden(change), offset)
  derivationPath.writeUInt32BE(harden(0), offset)

  // }
  // }

  return derivationPath
}

function getSolanaDerivationPath(account?: number, change?: number): Buffer {
  const length = account !== undefined ? (change === undefined ? 3 : 4) : 2
  const derivationPath = Buffer.alloc(1 + length * 4)

  let offset = derivationPath.writeUInt8(length, 0)
  offset = derivationPath.writeUInt32BE(harden(44), offset) // Using BIP44
  offset = derivationPath.writeUInt32BE(harden(501), offset) // Solana's BIP44 path

  if (account !== undefined) {
    offset = derivationPath.writeUInt32BE(harden(account), offset)
    if (change !== undefined) {
      derivationPath.writeUInt32BE(harden(change), offset)
    }
  }

  return derivationPath
}

function partitionBy<A>(arr: A[], predicate: (a: A) => boolean): [A[], A[]] {
  // @ts-ignore
  return arr.reduce((acc, item) => (acc[+!predicate(item)].push(item), acc), [[], []])
}

const ATTESTATION =
  'I attest that both the source and destination wallets are owned and controlled by the same individual or entity, and that I have legal authority to perform this transaction on behalf of that individual or entity.'

function useSteps({ initialStep }: { initialStep: number }): {
  nextStep: () => void
  prevStep: () => void
  reset: () => void
  activeStep: number
} {
  const [activeStep, setActiveStep] = useState(initialStep)
  const nextStep = React.useCallback(() => setActiveStep(activeStep + 1), [activeStep])
  const prevStep = React.useCallback(() => setActiveStep(activeStep - 1), [activeStep])
  const reset = () => setActiveStep(initialStep)
  return { nextStep, prevStep, reset, activeStep }
}

const Step: React.FunctionComponent<{
  children: React.ReactNode
  label: string
}> = ({ children }) => {
  return <div>{children}</div>
}

const Steps: React.FunctionComponent<{
  children: React.ReactElement[]
  activeStep: number
}> = ({ children, activeStep }) => {
  return (
    <div className="steps">
      {children.map((child, index) => {
        return (
          <div className="step">
            <div key={index} className="step-container">
              <div
                className={`step-icon-container ${
                  index == activeStep ? 'active' : index < activeStep ? 'done' : undefined
                }`}
              >
                {activeStep > index ? (
                  <div className="step-icon">
                    <FaCheck />
                  </div>
                ) : (
                  <span className="step-icon-span">{index + 1}</span>
                )}
              </div>
              <div className="step-title">{child.props.label}</div>
            </div>
            <div className="step-content">
              <div style={{ display: activeStep == index ? 'block' : 'none' }} className="collapse">
                {child}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const LedgerMigration = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })
  const { siteConfig } = useDocusaurusContext()
  const migrationUrl = siteConfig.customFields.MIGRATION_SERVICE_URL
  const [solanaPubkey, setSolanaPubkey] = useState<PublicKey | null>(null)
  const [heliumPubkey, setHeliumPubkey] = useState<PublicKey | null>(null)
  const [accountNumber, setAccountNumber] = useState<string>('0')
  const heliumWallet = useMemo(
    () =>
      new LedgerWalletAdapter({
        derivationPath: getHeliumDerivationPath(Number(accountNumber)),
      }),
    [accountNumber],
  )
  const solanaWallet = useMemo(
    () =>
      new LedgerWalletAdapter({
        derivationPath: getSolanaDerivationPath(Number(accountNumber) || undefined),
      }),
    [accountNumber],
  )
  const [attested, setAttested] = useState(false)
  const connection = useMemo(
    () => new Connection(siteConfig.customFields.SOLANA_URL!),
    [siteConfig.customFields.SOLANA_URL],
  )
  const {
    execute,
    error: errorSolana,
    loading: loadingSolana,
  } = useAsyncCallback(async () => {
    await solanaWallet.connect()
    setSolanaPubkey(solanaWallet.publicKey)
    // Disconnect so we can connect the helium ledger
    await solanaWallet.disconnect()
    return solanaWallet
  })
  const {
    execute: executeHelium,
    error: errorHelium,
    loading: loadingHelium,
  } = useAsyncCallback(async () => {
    await heliumWallet.connect()
    setHeliumPubkey(heliumWallet.publicKey)
    return heliumWallet
  })
  const {
    result: seedResult,
    execute: executeSeed,
    error: errorSeed,
    loading: loadingSeed,
  } = useAsyncCallback(async (wallet: PublicKey) => {
    async function getTxs() {
      return (await axios.get(`${migrationUrl}/migrate/${wallet.toBase58()}`)).data
    }
    const txs = (await getTxs()).transactions
    const txBuffers = txs.map((tx: any) => Buffer.from(tx))

    await bulkSendRawTransactions(connection, txBuffers)

    const txs2 = (await getTxs()).transactions
    if (txs2.length !== 0) {
      throw new Error(`Failed to migrate ${txs2.length} transactions, try again`)
    }

    return true
  })
  const {
    result: heliumSignResult,
    execute: executeHeliumSign,
    error: errorHeliumSign,
    loading: loadingHeliumSign,
  } = useAsyncCallback(async () => {
    async function getTxs() {
      return (
        await axios.post(`${migrationUrl}/ledger/migrate`, {
          from: heliumPubkey!.toBase58(),
          to: solanaPubkey!.toBase58(),
          attestation: ATTESTATION,
        })
      ).data
    }
    const txs = await getTxs()
    const txBuffers = txs.map((tx: any) => Buffer.from(tx))
    const deserialized = txBuffers.map((tx: Buffer) => Transaction.from(tx))
    const signed = await heliumWallet!.signAllTransactions(deserialized)
    // Disconnect so we can connect the helium ledger
    await heliumWallet.disconnect()

    return signed
  })
  const {
    result: solanaSignResult,
    execute: executeSolanaSign,
    error: errorSolanaSign,
    loading: loadingSolanaSign,
  } = useAsyncCallback(async () => {
    const [needSign, dontNeedSign] = partitionBy(heliumSignResult!, (tx) =>
      tx.signatures.some((sig) => sig.publicKey.equals(solanaPubkey!)),
    )
    await solanaWallet.connect()
    if (needSign.length > 0) {
      console.log(needSign)
      const signed = await solanaWallet!.signAllTransactions(needSign)
      return [...dontNeedSign, ...signed]
    }

    return dontNeedSign
  })

  const {
    result: resultSendTransactions,
    execute: executeSendTransactions,
    error: errorSendTransactions,
    loading: loadingSendTransactions,
  } = useAsyncCallback(async () => {
    const txs = solanaSignResult!.map((tx) => Buffer.from(tx.serialize()))
    await bulkSendRawTransactions(connection, txs)
    let sent = [
      ...(await bulkSendRawTransactions(connection, txs.slice(0, -1))),
      // Ensure the last transaction (pulling up all the sol) runs last.
      ...(await bulkSendRawTransactions(connection, txs.slice(-1))),
    ]

    if (sent.length != txs.length) {
      throw new Error('Failed to send all transactions, please try again')
    }
    return true
  })

  const nextEnabled = useMemo(
    () =>
      activeStep === 0
        ? solanaPubkey
        : activeStep === 1
        ? heliumWallet.connected
        : activeStep === 2
        ? seedResult
        : activeStep === 3
        ? !!heliumSignResult
        : activeStep === 4
        ? !!solanaSignResult
        : activeStep === 5
        ? resultSendTransactions
        : true,
    [
      activeStep,
      heliumSignResult,
      heliumWallet.connected,
      seedResult,
      solanaPubkey,
      solanaSignResult,
      resultSendTransactions,
    ],
  )
  const steps = useMemo(
    () => [
      {
        label: 'Connect Solana Ledger',
        component: (
          <VStack>
            {errorSolana && (
              <Alert status="error">
                <AlertIcon />
                <p>
                  {errorSolana.message}. Please make sure you are connected to the Solana Ledger App
                  and have blind signing enabled.
                </p>
              </Alert>
            )}
            <Text>
              Open the Solana App on your ledger. Be sure to{' '}
              <a href="https://support.ledger.com/hc/en-us/articles/4499092909085-Allowing-blind-signing-in-the-Solana-SOL-app?support=true">
                enable blind signing
              </a>{' '}
              in the Ledger Settings. Select the account number you would like to migrate. Then
              click the button below.
            </Text>
            <div style={{ fontWeight: 900, marginBottom: '-18px' }}>Account Number</div>
            <Flex justify="center" mt={3}>
              <Input
                type="number"
                placeholder="0"
                w="100px"
                onChange={(e) => {
                  setAccountNumber(e.target.value)
                }}
                step="1"
              />
            </Flex>

            <Button
              colorScheme="info"
              isLoading={loadingSolana}
              onClick={async () => {
                await execute()
              }}
              leftIcon={solanaPubkey ? <Icon as={FaCheckCircle} /> : undefined}
            >
              {solanaPubkey ? solanaPubkey.toBase58() : 'Connect Ledger (Solana App)'}
            </Button>
          </VStack>
        ),
      },
      {
        label: 'Connect Helium-Solana Ledger',
        component: (
          <VStack>
            {errorHelium && (
              <Alert status="error">
                <AlertIcon />
                <p>
                  {errorHelium.message}. Please make sure you are connected to the Helium-Solana
                  Ledger App and have blind signing enabled.
                </p>
              </Alert>
            )}
            <Text>
              Open the Helium-Solana App on your ledger. Be sure to{' '}
              <a href="https://support.ledger.com/hc/en-us/articles/4499092909085-Allowing-blind-signing-in-the-Solana-SOL-app?support=true">
                enable blind signing
              </a>{' '}
              in the Ledger Settings. Then click the button below.
            </Text>
            <Button
              colorScheme="info"
              isLoading={loadingHelium}
              onClick={executeHelium}
              leftIcon={heliumPubkey ? <Icon as={FaCheckCircle} /> : undefined}
            >
              {heliumPubkey ? heliumPubkey.toBase58() : 'Connect Ledger (Helium Solana App)'}
            </Button>
          </VStack>
        ),
      },
      {
        label: 'Keep Helium-Solana Ledger Connected and Seed Wallet on Solana',
        component: (
          <VStack>
            {errorSeed && (
              <Alert status="error">
                <AlertIcon />
                {errorSeed.message}
              </Alert>
            )}
            Seed your tokens and hotspots into your Solana wallet
            <Button
              colorScheme="info"
              isLoading={loadingSeed}
              isDisabled={seedResult}
              onClick={() => executeSeed(heliumPubkey!)}
              leftIcon={seedResult ? <Icon as={FaCheckCircle} /> : undefined}
            >
              Seed Wallet
            </Button>
          </VStack>
        ),
      },
      {
        label: 'Sign Transactions with Helium-Solana',
        component: (
          <VStack>
            {errorHeliumSign && (
              <Alert status="error">
                <AlertIcon />
                {errorHeliumSign.message}. Please make sure you are connected to the Helium-Solana
                Ledger App and have blind signing enabled.
              </Alert>
            )}
            Sign transactions to migrate from the Helium derivation path to the Solana derivation
            path.
            <Button
              colorScheme="info"
              isLoading={loadingHeliumSign}
              onClick={executeHeliumSign}
              leftIcon={heliumSignResult ? <Icon as={FaCheckCircle} /> : undefined}
            >
              Sign Transactions
            </Button>
          </VStack>
        ),
      },
      {
        label: 'Sign Transactions with Solana',
        component: (
          <VStack>
            {errorSolanaSign && (
              <Alert status="error">
                <AlertIcon />
                {errorSolanaSign.message}. Please make sure you are connected to the Solana Ledger
                App and have blind signing enabled.
              </Alert>
            )}
            Open the Solana Ledger app. Sign transactions to migrate from the Helium derivation path
            to the Solana derivation path.
            <Button
              colorScheme="info"
              isLoading={loadingSolanaSign}
              onClick={executeSolanaSign}
              leftIcon={solanaSignResult ? <Icon as={FaCheckCircle} /> : undefined}
            >
              Connect and Sign Transactions
            </Button>
          </VStack>
        ),
      },
      {
        label: 'Send Migration Transactions',
        component: (
          <VStack>
            {errorSendTransactions && (
              <Alert status="error">
                <AlertIcon />
                {errorSendTransactions.message}
              </Alert>
            )}
            <Checkbox onChange={() => setAttested(!attested)} isChecked={attested}>
              {ATTESTATION}
            </Checkbox>

            <Button
              colorScheme="info"
              isDisabled={!attested}
              isLoading={loadingSendTransactions}
              onClick={executeSendTransactions}
              leftIcon={resultSendTransactions ? <Icon as={FaCheckCircle} /> : undefined}
            >
              Send Transactions
            </Button>
          </VStack>
        ),
      },
    ],
    [
      attested,
      errorHelium,
      errorHeliumSign,
      errorSeed,
      errorSendTransactions,
      errorSolana,
      errorSolanaSign,
      execute,
      executeHelium,
      executeHeliumSign,
      executeSeed,
      executeSendTransactions,
      executeSolanaSign,
      heliumPubkey,
      heliumSignResult,
      seedResult,
      loadingHelium,
      loadingHeliumSign,
      loadingSeed,
      loadingSendTransactions,
      loadingSolana,
      loadingSolanaSign,
      resultSendTransactions,
      solanaPubkey,
      solanaSignResult,
    ],
  )

  return (
    <VStack>
      <Steps activeStep={activeStep}>
        {steps.map(({ label, component }, index) => (
          <Step label={label} key={index}>
            {component}
            {
              <Flex mt={4} width="100%" justify="flex-end">
                <Button
                  isDisabled={activeStep === 0}
                  mr={4}
                  onClick={prevStep}
                  size="sm"
                  colorScheme="link"
                >
                  Prev
                </Button>
                <Button
                  colorScheme="success"
                  size="sm"
                  onClick={nextStep}
                  isDisabled={!nextEnabled}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Flex>
            }
          </Step>
        ))}
      </Steps>
      {activeStep === steps.length && (
        <Flex px={4} py={4} width="100%" flexDirection="column">
          <Heading fontSize="24px" textAlign="center">
            Ledger successfully migrated!
          </Heading>
        </Flex>
      )}
    </VStack>
  )
}
