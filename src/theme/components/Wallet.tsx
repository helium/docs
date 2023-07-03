import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { AccountProvider } from '@helium/account-fetch-cache-hooks'
import { LedgerWalletAdapter } from '@solana/wallet-adapter-ledger'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import {
  ConnectionProvider,
  WalletProvider,
  useConnection
} from '@solana/wallet-adapter-react'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React, { useMemo } from 'react'

const WalletImpl: React.FC = ({ children }: { children: any }) => {
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
      new LedgerWalletAdapter(),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
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

export const Wallet = ({ children }) => {
  return (
    <ClientOnly>
      <WalletImpl>{children}</WalletImpl>
    </ClientOnly>
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