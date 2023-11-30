import "./bufferFill"
import React, { useMemo } from "react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import axios from "axios"
import { useAsyncCallback } from "react-async-hook";
import { bulkSendRawTransactions } from '@helium/spl-utils'
import { Connection, PublicKey } from "@solana/web3.js";
import Address from "@helium/address";
import { ED25519_KEY_TYPE } from "@helium/address/build/KeyTypes";

export const MigrateWallet = () => {
  const { siteConfig } = useDocusaurusContext()
  const migrationUrl = siteConfig.customFields.MIGRATION_SERVICE_URL
  const [wallet, setWallet] = React.useState<string>("")
  
  const solanaWallet = useMemo(() => {
    try {
      return new PublicKey(wallet)
    } catch (e: any) {
      // ignore
      try {
        return new PublicKey(Address.fromB58(wallet).publicKey)
      } catch (e: any) {
        // ignore
      }
    }
  }, [wallet])
  const heliumWallet = useMemo(
    () => solanaWallet && new Address(0, 0, ED25519_KEY_TYPE, solanaWallet.toBytes()),
    [solanaWallet]
  )
  const connection = useMemo(
    () => new Connection(siteConfig.customFields.SOLANA_URL!),
    [siteConfig.customFields.SOLANA_URL],
  )
  const {
    result: inflateResult,
    execute: executeInflate,
    error: errorInflate,
    loading: loadingInflate,
  } = useAsyncCallback(async (wallet: PublicKey) => {
    async function getTxs() {
      return (await axios.get(`${migrationUrl}/migrate/${wallet.toBase58()}?limit=1000`)).data
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

  return (
    <div className="font-disable-calt" style={{ paddingBottom: '20px' }}>
      {errorInflate && (
        <div class="alert alert--danger" role="alert">
          {errorInflate.message}
        </div>
      )}
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
          width: '100%',
        }}
        type="text"
        name="wallet"
        placeholder="Helium or Solana Wallet Address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />
      <div>Helium Address: {heliumWallet?.b58}</div>
      <div>
        Solana Address:{' '}
        <a
          target="_blank"
          href={`https://explorer.solana.com/address/${solanaWallet?.toBase58()}?cluster=${
            siteConfig.customFields.SOLANA_URL.includes('devnet') ? 'devnet' : 'mainnet-beta'
          }`}
        >
          {solanaWallet?.toBase58()}
        </a>
      </div>
      <button
        disabled={!solanaWallet || loadingInflate}
        className="button button--primary"
        style={{ width: '100%' }}
        onClick={() => executeInflate(solanaWallet!)}
      >
        {loadingInflate ? 'Submitting...' : 'Seed Wallet'}
      </button>
    </div>
  )
}
