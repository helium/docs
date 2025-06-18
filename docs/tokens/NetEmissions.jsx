import React, { useState } from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'
import styles from './NetEmissions.module.css'

export const NetEmissions = () => (
  <BrowserOnly>
    {() => {
      const EMISSIONS_CAP = 1643.83561643
      const formatter = new Intl.NumberFormat(navigator.language, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
      })

      const [yesterday, setYesterday] = useState(400)
      const [today, setToday] = useState(9500)

      const uncappedTarget = (yesterday * 6) / 7 + (today * 1) / 7
      const isCapped = uncappedTarget > EMISSIONS_CAP
      const netEmissions = Math.min(uncappedTarget, EMISSIONS_CAP)
      const burned = Math.max(today - netEmissions, 0)

      const setPreset = (y, t) => {
        setYesterday(y)
        setToday(t)
      }

      return (
        <div className={styles.container}>
          <div className={styles.buttons}>
            <button onClick={() => setPreset(400, 9500)} className={styles.button}>
              Example
              <div className={styles.example}>
                Target: 400 HNT
                <br />
                Burn: 9500 HNT
              </div>
            </button>
            <button onClick={() => setPreset(1650, 200)} className={styles.button}>
              Example
              <div className={styles.example}>
                Target: 1650 HNT
                <br />
                Burn: 200 HNT
              </div>
            </button>
            <button onClick={() => setPreset(1440, 2000)} className={styles.button}>
              Example
              <div className={styles.example}>
                Target: 1440 HNT
                <br />
                Burn: 2000 HNT
              </div>
            </button>
          </div>

          <div className={styles.box}>
            <div className={styles.inputRow}>
              <input
                type="range"
                min="0"
                max="10000"
                step="1"
                value={yesterday}
                onChange={(e) => setYesterday(Number(e.target.value))}
              />
            </div>
            <p>
              Yesterday's Net Emissions Target: <strong>{formatter.format(yesterday)}</strong> HNT
            </p>

            <div className={styles.inputRow}>
              <input
                type="range"
                min="0"
                max="10000"
                step="1"
                value={today}
                onChange={(e) => setToday(Number(e.target.value))}
              />
            </div>
            <p>
              Today's HNT Burned: <strong>{formatter.format(today)}</strong> HNT
            </p>
          </div>

          <div className={styles.box}>
            <p>
              If yesterday's Net Emissions Target was <strong>{yesterday.toLocaleString()}</strong>{' '}
              HNT and today's HNT Burned is <strong>{formatter.format(today)}</strong> HNT, then
              today's Net Emissions Target is calculated as follows:
            </p>
            <p>
              (<strong>{formatter.format(yesterday)}</strong> × 6/7) + (
              <strong>{formatter.format(today)}</strong> × 1/7) ={' '}
              <strong>{formatter.format(uncappedTarget)}</strong> HNT{''}
              {isCapped && (
                <>
                  <br />
                  However, this will be capped at <strong>
                    {formatter.format(EMISSIONS_CAP)}
                  </strong>{' '}
                  HNT as today's Net Emissions.
                </>
              )}
              {!isCapped && <> which is below the emissions cap.</>}
            </p>

            <p>
              The difference between the burn and emission represents the change in HNT supply.
              <br />
              Today's HNT Burned value <strong>{today}</strong> HNT minus today's Net Emissions{' '}
              <strong>{formatter.format(netEmissions)}</strong> HNT equals{' '}
              <strong>{formatter.format(burned)}</strong> HNT permanently burned.
            </p>

            <p>
              Tomorrow, the uncapped number{' '}
              <code>
                Net Emissions Target<sub>Today</sub>
              </code>{' '}
              (<strong>{formatter.format(uncappedTarget)}</strong>) will become{' '}
              <code>
                Net Emissions Target<sub>Yesterday</sub>
              </code>
              .
            </p>
          </div>
        </div>
      )
    }}
  </BrowserOnly>
)
