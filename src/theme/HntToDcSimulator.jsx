import React, { useEffect, useRef, useState } from 'react'
import { PriceServiceConnection } from '@pythnetwork/price-service-client'
import styles from './HntToDcSimulator.module.css'

const DC_PRICE = 0.00001 // 1 DC = $0.00001
const HNT_PRICE_ID = '0x649fdd7ec08e8e2a20f425729854e90293dcbe2376abc47197a14da6ff339756'
const HERMES_ENDPOINT = 'https://hermes.pyth.network'

function calculateDc(price) {
  return price / DC_PRICE
}
function getRoundedPrice(price) {
  return Math.round(price * 100) / 100
}

export const HntToDcSimulator = () => {
  const [liveHntPrice, setLiveHntPrice] = useState(0)
  const [simulatedHntPrice, setSimulatedHntPrice] = useState(1)
  const [sliderRange, setSliderRange] = useState({ min: 0, max: 5 })
  const initialPriceSetRef = useRef(false)

  useEffect(() => {
    const connection = new PriceServiceConnection(HERMES_ENDPOINT, {
      priceFeedRequestConfig: { binary: false },
    })

    const handlePriceUpdate = (priceFeed) => {
      const { price, expo } = priceFeed.price
      const rawPrice = parseInt(price, 10)
      const scaledPrice = rawPrice * 10 ** expo

      if (scaledPrice > 0) {
        setLiveHntPrice(scaledPrice)

        if (!initialPriceSetRef.current) {
          setInitialSliderValues(scaledPrice)
          initialPriceSetRef.current = true
        }
      }
    }

    connection.subscribePriceFeedUpdates([HNT_PRICE_ID], handlePriceUpdate)

    return () => {
      connection.closeWebSocket()
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
