import './bufferFill'
import React from 'react'
import { bulkSendRawTransactions } from '@helium/spl-utils'
import { LedgerWalletAdapter } from '@solana/wallet-adapter-ledger'
import { useAsyncCallback } from 'react-async-hook'
import { useMemo, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { FaCheckCircle, FaCheck } from 'react-icons/fa'
import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import axios from 'axios'
import { FaExclamationCircle } from 'react-icons/fa'
import './LedgerMigration.css'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

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

const Icon: React.FunctionComponent<{ spin?: boolean; mr?: number; as: any }> = ({
  spin,
  as: children,
  mr,
}) => {
  return (
    <div className={spin ? 'spin' : ''} style={{ display: 'flex', marginRight: 3 * mr + 'px' }}>
      {React.createElement(children)}
    </div>
  )
}

const Checkbox: React.FunctionComponent<{
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  isChecked?: boolean
  children?: React.ReactNode
}> = ({ isChecked, onChange, children }) => {
  return (
    <Flex flexDirection="row">
      <input type="checkbox" onChange={onChange} checked={isChecked} />
      {children}
    </Flex>
  )
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

const Alert: React.FunctionComponent<{
  children: React.ReactNode
  status: 'error' | 'warning'
}> = ({ children }) => {
  return (
    <div className={`alert alert--${status == 'error' ? 'danger' : 'warning'}`} role="alert">
      {children}
    </div>
  )
}

const Button: React.FunctionComponent<{
  colorScheme?: string
  isLoading?: boolean
  onClick?: () => void
  isDisabled?: boolean
  leftIcon?: React.ReactNode
  w?: string
  children: React.ReactNode
  mr?: number
  size?: string
  mt?: number
}> = ({ colorScheme, isLoading, onClick, isDisabled, leftIcon, children, w, mr, mt, size }) => {
  return (
    <button
      disabled={isDisabled || isLoading}
      className={`button button--${colorScheme} button--${size}`}
      style={{
        width: w,
        marginRight: mr ? mr * 3 + 'px' : undefined,
        marginTop: mt ? mt * 3 + 'px' : undefined,
      }}
      onClick={onClick}
    >
      <Flex flexDirection="row" justify="center" align="center">
        {leftIcon && <Flex mr={3}>{leftIcon}</Flex>}
        {isLoading && <Icon spin mr={3} as={CgSpinner} />}
        {children}
      </Flex>
    </button>
  )
}

const Flex: React.FunctionComponent<{
  mt?: number
  mr?: number
  px?: number
  py?: number
  align?: string
  width?: string
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justify?: string
  children?: React.ReactNode
}> = ({ align, children, px, mt, mr, py, width, flexDirection, justify }) => {
  return (
    <div
      style={{
        display: 'flex',
        marginTop: mt * 3 + 'px',
        marginRight: mr * 3 + 'px',
        paddingLeft: px * 3 + 'px',
        paddingRight: px * 3 + 'px',
        paddingTop: py * 3 + 'px',
        paddingBottom: py * 3 + 'px',
        flexDirection,
        justifyContent: justify,
        width,
        alignItems: align,
      }}
    >
      {children}
    </div>
  )
}

const AlertIcon: React.FunctionComponent = () => {
  return <FaExclamationCircle />
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
    result: inflateResult,
    execute: executeInflate,
    error: errorInflate,
    loading: loadingInflate,
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
    const [needSign, dontNeedSign] = partitionBy(
      heliumSignResult!,
      (tx) => tx.signatures.length > 1,
    )
    await solanaWallet.connect()
    const signed = await solanaWallet!.signAllTransactions(needSign)

    return [...dontNeedSign, ...signed]
  })

  const {
    result: resultSendTransactions,
    execute: executeSendTransactions,
    error: errorSendTransactions,
    loading: loadingSendTransactions,
  } = useAsyncCallback(async () => {
    const txs = solanaSignResult!.map((tx) => Buffer.from(tx.serialize()))
    await bulkSendRawTransactions(connection, txs)
    return true
  })

  const nextEnabled = useMemo(
    () =>
      activeStep === 0
        ? solanaPubkey
        : activeStep === 1
        ? heliumWallet.connected
        : activeStep === 2
        ? inflateResult
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
      inflateResult,
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
                  {errorSolana.message}. Please make sure you are connected to the correct ledger
                  app.
                </p>
              </Alert>
            )}
            <Text>
              Open the Solana App on your ledger. Be sure to enable blind signing in the Ledger
              Settings. Select the account number you would like to migrate. Then click the button
              below.
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
                  {errorHelium.message}. Please make sure you are connected to the correct ledger
                  app.
                </p>
              </Alert>
            )}
            <Text>
              Open the Helium-Solana App on your ledger. Be sure to enable blind signing in the
              Ledger Settings. Then click the button below.
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
        label: 'Inflate Wallet on Solana',
        component: (
          <VStack>
            {errorInflate && (
              <Alert status="error">
                <AlertIcon />
                {errorInflate.message}
              </Alert>
            )}
            Inflate the your tokens and hotspots onto Solana
            <Button
              colorScheme="info"
              isLoading={loadingInflate}
              isDisabled={inflateResult}
              onClick={() => executeInflate(heliumPubkey!)}
              leftIcon={inflateResult ? <Icon as={FaCheckCircle} /> : undefined}
            >
              Inflate Wallet
            </Button>
          </VStack>
        ),
      },
      {
        label: 'Sign Transactions with Helium',
        component: (
          <VStack>
            {errorHeliumSign && (
              <Alert status="error">
                <AlertIcon />
                {errorHeliumSign.message}
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
                {errorSolanaSign.message}
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
      errorInflate,
      errorSendTransactions,
      errorSolana,
      errorSolanaSign,
      execute,
      executeHelium,
      executeHeliumSign,
      executeInflate,
      executeSendTransactions,
      executeSolanaSign,
      heliumPubkey,
      heliumSignResult,
      inflateResult,
      loadingHelium,
      loadingHeliumSign,
      loadingInflate,
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
          <Step label={label} key={label}>
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