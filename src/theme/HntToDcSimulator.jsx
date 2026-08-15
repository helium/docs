import React, { useEffect, useRef, useState } from 'react'
import './bufferFill'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { Connection, PublicKey } from '@solana/web3.js'
import { dataCreditsKey } from '@helium/data-credits-sdk'
import { DC_MINT } from '@helium/spl-utils'
import styles from './HntToDcSimulator.module.css'

const DC_PRICE = 0.00001 // 1 DC = $0.00001
const HNT_PRICE_FEED_ID = '649fdd7ec08e8e2a20f425729854e90293dcbe2376abc47197a14da6ff339756'

// Streams the on-chain oracle price (snapshot on connect, then a frame only when
// the price changes). EventSource reconnects on its own per the server's retry hint.
const STREAM_URL = 'https://api.heliumtools.org/hnt-price/sse'

// DataCreditsV0 layout: 8-byte discriminator, dc_mint (32), hnt_mint (32),
// authority (32), then hnt_price_oracle at bytes 104..136.
const HNT_PRICE_ORACLE_OFFSET = 104

function calculateDc(price) {
  return price / DC_PRICE
}
function getRoundedPrice(price) {
  return Math.round(price * 100) / 100
}

// Parses a Pyth PriceUpdateV2 account: 8-byte discriminator, write_authority (32),
// verification_level (borsh enum: tag 0 = Partial + u8, tag 1 = Full), then the
// price message: feed_id (32), price (i64 LE), conf (u64), exponent (i32 LE).
// Returns the scaled USD price, or null on any mismatch so failures stay silent.
function parsePriceUpdateV2(data) {
  try {
    const view = new DataView(data.buffer, data.byteOffset, data.byteLength)
    let offset = 8 + 32
    const verificationTag = view.getUint8(offset)
    offset += 1
    if (verificationTag === 0) {
      offset += 1
    } else if (verificationTag !== 1) {
      return null
    }
    const feedId = Array.from(data.subarray(offset, offset + 32))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
    if (feedId !== HNT_PRICE_FEED_ID) {
      return null
    }
    offset += 32
    const price = view.getBigInt64(offset, true)
    offset += 8 + 8 // skip conf
    const exponent = view.getInt32(offset, true)
    const scaledPrice = Number(price) * 10 ** exponent
    return Number.isFinite(scaledPrice) && scaledPrice > 0 ? scaledPrice : null
  } catch {
    return null
  }
}

// Fallback for when the stream never delivers a price: a single read of the same
// oracle straight from the chain. Resolves the oracle address from the on-chain
// DataCreditsV0 account so it stays correct if the oracle is rotated again.
async function fetchOracleHntPrice(endpoint) {
  try {
    if (!endpoint) {
      return null
    }
    const connection = new Connection(endpoint)
    const dataCredits = await connection.getAccountInfo(dataCreditsKey(DC_MINT)[0])
    if (!dataCredits || dataCredits.data.length < HNT_PRICE_ORACLE_OFFSET + 32) {
      return null
    }
    const oracleKey = new PublicKey(
      dataCredits.data.subarray(HNT_PRICE_ORACLE_OFFSET, HNT_PRICE_ORACLE_OFFSET + 32),
    )
    const oracle = await connection.getAccountInfo(oracleKey)
    return oracle ? parsePriceUpdateV2(oracle.data) : null
  } catch {
    return null
  }
}

export const HntToDcSimulator = () => {
  const { siteConfig } = useDocusaurusContext()
  const [liveHntPrice, setLiveHntPrice] = useState(0)
  const [simulatedHntPrice, setSimulatedHntPrice] = useState(1)
  const [sliderRange, setSliderRange] = useState({ min: 0, max: 5 })
  const initialPriceSetRef = useRef(false)

  useEffect(() => {
    const endpoint = siteConfig.customFields.SOLANA_URL
    let cancelled = false
    let fallbackFired = false

    const applyPrice = (price) => {
      if (cancelled || typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
        return
      }
      setLiveHntPrice(price)
      if (!initialPriceSetRef.current) {
        setInitialSliderValues(price)
        initialPriceSetRef.current = true
      }
    }

    const source = new EventSource(STREAM_URL)
    source.onmessage = (event) => {
      try {
        // Full /current-shaped snapshot; spot can be null, so read oracle defensively.
        applyPrice(JSON.parse(event.data)?.oracle?.usd)
      } catch {
        // Ignore malformed frames; the next snapshot or the fallback covers us.
      }
    }
    source.onerror = () => {
      // EventSource reconnects on its own after network-level failures (a fatal
      // HTTP response closes it for good). Either way, the one-time on-chain read
      // covers the case where the stream has never delivered a price at all.
      if (fallbackFired || initialPriceSetRef.current) {
        return
      }
      fallbackFired = true
      fetchOracleHntPrice(endpoint).then((price) => {
        // A reconnected stream may have delivered a fresher price in the meantime.
        if (!initialPriceSetRef.current) {
          applyPrice(price)
        }
      })
    }

    return () => {
      cancelled = true
      source.close()
    }
  }, [])

  const setInitialSliderValues = (price) => {
    const roundedPrice = getRoundedPrice(price)
    setSimulatedHntPrice(roundedPrice)

    const upperLimit = Math.ceil(price / 5) * 5 + 5
    let lowerLimit = Math.max(0, Math.floor(price / 5) * 5 - 5)
    if (lowerLimit === 0) {
      lowerLimit = 0.01
    }
    setSliderRange({ min: lowerLimit, max: upperLimit })
  }

  const handleSliderChange = (event) => {
    const newPrice = parseFloat(event.target.value)
    setSimulatedHntPrice(newPrice)
  }

  const handleSetToLivePrice = () => {
    setSimulatedHntPrice(liveHntPrice)
  }

  const dcAmount = Math.round(calculateDc(simulatedHntPrice))
  const hntForTenDollars = 10 / simulatedHntPrice

  return (
    <div className={styles.componentSpacing}>
      <table className={styles.dcEstTable}>
        <thead>
          <tr>
            <th>DC from 1 HNT</th>
            <th>HNT burned for $10 DC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{dcAmount.toLocaleString()} DC</td>
            <td>{hntForTenDollars.toLocaleString()} HNT</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.interactiveBox}>
        <div className={styles.inputContainer}>
          <input
            type="range"
            min={sliderRange.min}
            max={sliderRange.max}
            step="0.01"
            value={simulatedHntPrice}
            onChange={handleSliderChange}
          />
        </div>

        <div className={styles.pricesContainer}>
          <p>Simulated HNT Oracle Price: ${simulatedHntPrice.toFixed(2)}</p>
          {liveHntPrice !== 0 && (
            <button onClick={handleSetToLivePrice} className={styles.setToLivePriceButton}>
              <span className={styles.textUnderline}>Set Live Oracle Price</span>
              <span>: ${liveHntPrice.toFixed(6)}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
