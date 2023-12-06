import { PythConnection } from '@pythnetwork/client'
import { Connection, PublicKey } from '@solana/web3.js'
import React, { useEffect, useState } from 'react'

const calculateDc = (price) => {
  const DC_PRICE = 0.00001
  return price / DC_PRICE
}

export const HntToDcSimulator = () => {
  const [liveHntPrice, setLiveHntPrice] = useState(0)
  const [simulatedHntPrice, setSimulatedHntPrice] = useState(1)
  const [sliderRange, setSliderRange] = useState({ min: 0, max: 5 })
  const [isInitialPriceSet, setIsInitialPriceSet] = useState(false)
  const dcAmount = calculateDc(simulatedHntPrice)

  useEffect(() => {
    const connection = new Connection('https://api.devnet.solana.com')
    const programKey = new PublicKey('gSbePebfvPy7tRqimPoVecS2UsBvYv46ynrzWocc92s')

    const pythConnection = new PythConnection(connection, programKey)
    pythConnection.onPriceChange((product, price) => {
      if (product.symbol === 'Crypto.HNT/USD' && price.price) {
        setLiveHntPrice(price.price)
        if (!isInitialPriceSet) {
          setInitialSliderValues(price.price)
          setIsInitialPriceSet(true)
        }
      }
    })

    pythConnection.start()
    return () => pythConnection.stop()
  }, [isInitialPriceSet])

  const setInitialSliderValues = (price) => {
    // based on queried price, update the initial position and min/max of the input
    const roundedPrice = Math.round(price * 100) / 100
    setSimulatedHntPrice(roundedPrice)
    const upperLimit = Math.ceil(price / 5) * 5 + 5
    let lowerLimit = Math.max(0, Math.floor(price / 5) * 5)
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
    const roundedPrice = Math.round(liveHntPrice * 100) / 100
    setSimulatedHntPrice(roundedPrice)
  }

  const hntForTenDollars = 10 / simulatedHntPrice

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <table className="dc-calc-table">
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
      <div
        style={{
          background: 'white',
          padding: '16px 16px 0',
          marginBottom: '1em',
        }}
        className="dc-calc-table"
      >
        <div style={{ display: 'flex', padding: '0.125em 0 0.125em 0' }}>
          <input
            type="range"
            min={sliderRange.min}
            max={sliderRange.max}
            step="0.01"
            value={simulatedHntPrice}
            onChange={handleSliderChange}
            style={{ flex: '1 1 auto' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <p>Simulated HNT Oracle Price: ${simulatedHntPrice.toFixed(2)}</p>
          {liveHntPrice ? (
            <button
              onClick={handleSetToLivePrice}
              style={{
                appearance: 'none',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#53627c',
                paddingLeft: '1em',
                fontSize: '1.125rem',
                lineHeight: '1.65rem',
                textAlign: 'right',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              <span style={{textDecoration: 'underline'}}>
                Set Live Oracle Price
              </span>
              <span>: ${liveHntPrice.toFixed(6)}</span>
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
