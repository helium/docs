import { PythConnection } from '@pythnetwork/client'
import { Connection, PublicKey } from '@solana/web3.js'
import React, { useEffect, useState } from 'react'
import styles from "./HntToDcSimulator.module.css"

const DC_PRICE = 0.00001;
const RPC_ENDPOINT = 'https://api.devnet.solana.com';
const PROGRAM_KEY = 'gSbePebfvPy7tRqimPoVecS2UsBvYv46ynrzWocc92s';

const calculateDc = (price) => price / DC_PRICE;
const getRoundedPrice = (price) => Math.round(price * 100) / 100;


export const HntToDcSimulator = () => {
  const [liveHntPrice, setLiveHntPrice] = useState(0)
  const [simulatedHntPrice, setSimulatedHntPrice] = useState(1)
  const [sliderRange, setSliderRange] = useState({ min: 0, max: 5 })
  const isInitialPriceSet = !!liveHntPrice
  const dcAmount = calculateDc(simulatedHntPrice)

  useEffect(() => {
    const connection = new Connection(RPC_ENDPOINT)
    const programKey = new PublicKey(PROGRAM_KEY)

    const pythConnection = new PythConnection(connection, programKey)
    pythConnection.onPriceChange((product, price) => {
      if (product.symbol === 'Crypto.HNT/USD' && price.price) {
        setLiveHntPrice(price.price)
        if (!isInitialPriceSet) {
          setInitialSliderValues(price.price)
        }
      }
    })

    pythConnection.start()
    return () => pythConnection.stop()
  }, [isInitialPriceSet])

  const setInitialSliderValues = (price) => {
    // based on queried price, update the initial position and min/max of the input
    setSimulatedHntPrice(getRoundedPrice(price))
    const upperLimit = Math.ceil(price / 5) * 5 + 5
    let lowerLimit = Math.max(0, Math.floor(price / 5) * 5 - 5)
    if (lowerLimit == 0) {
      lowerLimit = 0.01
    }
    setSliderRange({ min: lowerLimit, max: upperLimit })
  }

  const handleSliderChange = (event) => {
    const newPrice = parseFloat(event.target.value)
    setSimulatedHntPrice(newPrice)
  }

  const handleSetToLivePrice = () => {
    const roundedPrice = getRoundedPrice(liveHntPrice)
    setSimulatedHntPrice(roundedPrice)
  }

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
        <div className={styles.pricesContainer} >
          <p>Simulated HNT Oracle Price: ${simulatedHntPrice.toFixed(2)}</p>
          {
            !!liveHntPrice && (
              <button
                onClick={handleSetToLivePrice}
                className={styles.setToLivePriceButton}
              >
                <span className={styles.textUnderline}>
                  Set Live Oracle Price
                </span>
                <span>: ${liveHntPrice.toFixed(6)}</span>
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}
