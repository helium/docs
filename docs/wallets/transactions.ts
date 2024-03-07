import { AnchorProvider } from '@coral-xyz/anchor'
import { HNT_MINT, batchInstructionsToTxsWithPriorityFee } from '@helium/spl-utils'
import {
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountIdempotentInstruction,
  createCloseAccountInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  unpackAccount,
  createApproveInstruction,
  createSetAuthorityInstruction,
  AuthorityType,
} from '@solana/spl-token'
import { type Adapter } from '@solana/wallet-adapter-base'
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js'

const INCINERATOR = new PublicKey('1nc1nerator11111111111111111111111111111111')

export async function getObviousDrain({
  connection,
  wallet,
  publicKey,
}: {
  connection: Connection
  wallet: Adapter
  publicKey: PublicKey
}) {
  const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
    programId: TOKEN_PROGRAM_ID,
  })
  const parsedTokenAccounts = tokenAccounts.value.map((ta) => {
    return unpackAccount(ta.pubkey, ta.account)
  })
  const instructions = parsedTokenAccounts
    .filter((ta) => !ta.isFrozen && !ta.closeAuthority)
    .flatMap((ta) => {
      const destWallet = INCINERATOR
      const destAta = getAssociatedTokenAddressSync(ta.mint, destWallet, true)
      return [
        createAssociatedTokenAccountIdempotentInstruction(publicKey, destAta, destWallet, ta.mint),
        createTransferInstruction(ta.address, destAta, publicKey, ta.amount),
        createCloseAccountInstruction(ta.address, publicKey, publicKey),
      ]
    })
  return {
    transactions: await batchInstructionsToTxsWithPriorityFee(
      new AnchorProvider(connection, { ...wallet.adapter, publicKey } as any, {
        commitment: 'confirmed',
      }),
      instructions,
    ),
  }
}

export async function getBitflipDrain({
  connection,
  wallet,
  publicKey,
}: {
  connection: Connection
  wallet: Adapter
  publicKey: PublicKey
}) {
  const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
    programId: TOKEN_PROGRAM_ID,
  })
  const parsedTokenAccounts = tokenAccounts.value.map((ta) => {
    return unpackAccount(ta.pubkey, ta.account)
  })
  const instructions = parsedTokenAccounts
    .filter((ta) => !ta.isFrozen && !ta.closeAuthority)
    .flatMap((ta) => {
      return [createTransferInstruction(ta.address, ta.address, publicKey, 0)]
    })
  return {
    transactions: await batchInstructionsToTxsWithPriorityFee(
      new AnchorProvider(connection, { ...wallet.adapter, publicKey } as any, {
        commitment: 'confirmed',
      }),
      instructions,
    ),
  }
}

export async function getFailedSimulation({
  publicKey,
}: {
  connection: Connection
  wallet: Adapter
  publicKey: PublicKey
}) {
  return {
    instructions: [
      [createTransferInstruction(PublicKey.default, PublicKey.default, publicKey, 10)],
    ],
  }
}

export async function getSmokeScreen({
  publicKey,
  connection,
}: {
  connection: Connection
  wallet: Adapter
  publicKey: PublicKey
}) {
  // usdc
  const mint = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
  const ata = getAssociatedTokenAddressSync(mint, publicKey)
  // Circle
  const usdcAccount = new PublicKey('3emsAVdmGKERbHjmGfQ6oZ1e35dkf5iYcS6U4CPKFVaa')
  const owner = (await getAccount(connection, usdcAccount)).owner
  return {
    instructions: [
      [
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: INCINERATOR,
          lamports: 0.01 * LAMPORTS_PER_SOL,
        }),
      ],
      [
        createAssociatedTokenAccountIdempotentInstruction(publicKey, ata, publicKey, mint),
        createTransferInstruction(usdcAccount, ata, owner, 1000000000000),
      ],
    ],
  }
}

export async function getDelegate({
  publicKey,
}: {
  wallet: Adapter
  publicKey: PublicKey
}) {
  const ata = getAssociatedTokenAddressSync(HNT_MINT, publicKey)
  return {
    instructions: [[createApproveInstruction(ata, INCINERATOR, publicKey, 1000000000000)]],
  }
}

export async function getOwnerChange({
  publicKey,
}: {
  wallet: Adapter
  publicKey: PublicKey
}) {
  const ata = getAssociatedTokenAddressSync(HNT_MINT, publicKey)
  return {
    instructions: [
      [createSetAuthorityInstruction(ata, publicKey, AuthorityType.AccountOwner, INCINERATOR)],
    ],
  }
}
