import React, { useState, useCallback } from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js'
import { delegatedDataCreditsKey, escrowAccountKey } from '@helium/data-credits-sdk'
import { subDaoKey } from '@helium/helium-sub-daos-sdk'
import { IOT_MINT } from '@helium/spl-utils'
import { useAsync } from 'react-async-hook'
import { AnchorProvider } from '@coral-xyz/anchor'
import { getAccount } from '@solana/spl-token'

export const EscrowOUIWidget = () => {
  const [wallet, setWallet] = useState<string>('')

  const getEscrowTokenAccount = useCallback(
    (subDao: PublicKey) => {
      if (wallet) {
        try {
          const delegatedDataCredits = delegatedDataCreditsKey(subDao, wallet)[0]
          const escrowTokenAccount = escrowAccountKey(delegatedDataCredits)[0]

          return {
            escrowTokenAccount: escrowTokenAccount.toBase58(),
            delegatedDataCredits: delegatedDataCredits.toBase58(),
          }
        } catch (e) {
          throw e as Error
        }
      }
    },
    [wallet],
  )

  return (
    <div className="display-legacy-wallet font-disable-calt">
      <input
        type="text"
        name="wallet"
        placeholder="Enter Payer or Router Key"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />
      <BrowserOnly>
        {() => {
          if (typeof window !== 'undefined' && !window.Buffer) {
            window.Buffer = require('buffer/').Buffer
          }

          const IOT_SUB_DAO_KEY = subDaoKey(IOT_MINT)[0]
          const escrowTokenAccount = getEscrowTokenAccount(IOT_SUB_DAO_KEY)?.escrowTokenAccount

          return (
            <>
              <table>
                <tr>
                  <td>Escrow Account</td>
                  {escrowTokenAccount ? (
                    <td>
                      <a
                        href={`https://solana.fm/address/${escrowTokenAccount}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {escrowTokenAccount}
                      </a>
                    </td>
                  ) : (
                    <td style={{ color: '#aaa' }}>Solana base58 escrow token address</td>
                  )}
                </tr>

                <OuiEscrowAccountBalance
                  escrowAccount={escrowTokenAccount ? new PublicKey(escrowTokenAccount) : undefined}
                />
              </table>
            </>
          )
        }}
      </BrowserOnly>
    </div>
  )
}

type OuiAccountDataProps = {
  escrowAccount?: PublicKey
}

const OuiEscrowAccountBalance = ({ escrowAccount }: OuiAccountDataProps) => {
  const { siteConfig } = useDocusaurusContext()
  const endpoint = siteConfig.customFields.SOLANA_URL!

  const { result: dcBalance } = useAsync(async () => {
    if (!endpoint || !escrowAccount) return
    try {
      const keypair = Keypair.generate()
      const wallet = {
        publicKey: keypair.publicKey,
        signTransaction: async (transaction: Transaction) => {
          transaction.partialSign(keypair)
          return transaction
        },
        signAllTransactions: async (transactions: Transaction[]) => {
          return transactions.map((tx) => {
            tx.partialSign(keypair)
            return tx
          })
        },
      } as any

      const provider = new AnchorProvider(
        new Connection(endpoint, {
          commitment: 'processed',
        }),
        wallet,
        { commitment: 'processed' },
      )

      const account = await getAccount(provider.connection, escrowAccount)

      return account.amount.toString()
    } catch (e) {}
  }, [escrowAccount])

  return (
    <tr>
      <td>Escrow Account Balance</td>
      {dcBalance ? (
        <td>
          {Number(dcBalance).toLocaleString()} DC (
          {(Number(dcBalance) * 0.00001).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'code',
          })}
          )
        </td>
      ) : (
        <td style={{ color: '#aaa' }}>Escrow account DC balance</td>
      )}
    </tr>
  )
}
