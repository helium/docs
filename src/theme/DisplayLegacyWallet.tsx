import React, { useState, useMemo } from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';
import { PublicKey } from "@solana/web3.js";
import Address from "@helium/address";
import { ED25519_KEY_TYPE } from "@helium/address/build/KeyTypes";

export const DisplayLegacyWallet = () => {
  const [wallet, setWallet] = useState<string>("");

  return (
    <div className="display-legacy-wallet font-disable-calt">
      <input
        type="text"
        name="wallet"
        placeholder="Enter Helium or Solana Wallet Address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />
      <BrowserOnly>
        {() => {
          if (typeof window !== 'undefined' && !window.Buffer) {
            window.Buffer = require('buffer/').Buffer;
          }

          const solanaWallet = useMemo(() => {
            try {
              return new PublicKey(wallet);
            } catch (e: any) {
              try {
                return new PublicKey(Address.fromB58(wallet).publicKey);
              } catch (e: any) {
                // ignore
              }
            }
          }, [wallet]);

          const heliumWallet = useMemo(
            () => solanaWallet && new Address(0, 0, ED25519_KEY_TYPE, solanaWallet.toBuffer()), 
            [solanaWallet]
          );

          return (
            <>
              <table>
                <tr>
                  <td>Helium Address</td>
                  {heliumWallet?.b58 ? (
                    <td>{heliumWallet?.b58} </td>
                  ) : (
                    <td style={{color: '#aaa'}}>Helium base58 public address.</td>
                  )}
                </tr>
                <tr>
                  <td>Solana Address</td>
                  {solanaWallet?.toBase58() ? (
                    <td>{solanaWallet?.toBase58()}</td>
                  ) : (
                    <td style={{color: '#aaa'}}>Solana base58 public address.</td>
                  )}
                </tr>
              </table>
            </>
          );
        }}
      </BrowserOnly>
    </div>
  );
};
