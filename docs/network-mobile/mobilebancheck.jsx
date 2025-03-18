import React, { useState, useEffect } from 'react'
import styles from './mobilebancheck.module.css'

////////////////////////////
// SUGGESTION UTILITIES   //
////////////////////////////

function charsMatchOrCommonMistake(a, b) {
  if (a === b) return true
  // 0 ↔ O
  if ((a === '0' && b === 'O') || (a === 'O' && b === '0')) return true
  // 1 ↔ I
  if ((a === '1' && b === 'I') || (a === 'I' && b === '1')) return true
  return false
}

// Compare two same-length blocks, allowing up to 1 mismatch.
// letter↔digit mismatch counts as 2.
function isCloseBlock(blockA, blockB) {
  if (blockA.length !== blockB.length) return false
  let mismatch = 0
  for (let i = 0; i < blockA.length; i++) {
    if (!charsMatchOrCommonMistake(blockA[i], blockB[i])) {
      const letterDigit =
        (/[A-Z]/.test(blockA[i]) && /\d/.test(blockB[i])) ||
        (/\d/.test(blockA[i]) && /[A-Z]/.test(blockB[i]))
      mismatch += letterDigit ? 2 : 1
      if (mismatch > 1) return false
    }
  }
  return mismatch <= 1
}

////////////////////////////
// VALIDATION + FORMATTING
////////////////////////////

// The final valid pattern: (AT|EC|RK|XX|YY)(I|O)\d+(?:E)?-\d{4}-\d{8}
function validateSerial(serialWithDashes) {
  const validSerialRegex = /^(?:AT|EC|RK|XX|YY)(?:I|O)\d+(?:E)?-\d{4}-\d{8}$/i
  return validSerialRegex.test(serialWithDashes)
}

// Insert dashes only if final string is fully valid.
// E.g. 'ATI6241200014971' => 'ATI6-2412-00014971'
function insertDashes(str) {
  const len = str.length
  if (len < 5) return str
  if (len < 13) {
    if (len <= 8) {
      return str.slice(0, 4) + '-' + str.slice(4)
    } else {
      const firstCount = len - 12
      if (firstCount <= 0) {
        return str.slice(0, 4) + '-' + str.slice(4, 8) + (str.length > 8 ? '-' + str.slice(8) : '')
      }
    }
  }
  const mainBlockCount = len - 12
  if (mainBlockCount < 1) {
    return str
  }
  const block1 = str.slice(0, mainBlockCount)
  const block2 = str.slice(mainBlockCount, mainBlockCount + 4)
  const block3 = str.slice(mainBlockCount + 4)
  return block1 + '-' + block2 + '-' + block3
}

// Keep A–Z, 0–9, and dashes. Uppercase letters.
function stripToAllowed(str) {
  return str.replace(/[^A-Z0-9-]/gi, '').toUpperCase()
}

// For validation or suggestions, remove dashes.
function removeDashes(str) {
  return str.replace(/-/g, '')
}

// Split a raw (no-dash) string into up to 3 blocks: first slab, next 4, last 8.
function parseBlocks(str) {
  const len = str.length
  if (len <= 4) {
    return [str, '', '']
  } else if (len <= 8) {
    return [str.slice(0, 4), str.slice(4), '']
  } else {
    const mainBlockCount = len - 12
    if (mainBlockCount <= 0) {
      // partial scenario
      return [str.slice(0, 4), str.slice(4, 8), str.slice(8)]
    }
    const b1 = str.slice(0, mainBlockCount)
    const b2 = str.slice(mainBlockCount, mainBlockCount + 4)
    const b3 = str.slice(mainBlockCount + 4)
    return [b1, b2, b3]
  }
}

// Replace hyphens with spaces, then capitalize each word.
function formatHotspotName(name) {
  return name
    .split('-')
    .map((word) => {
      if (!word) return ''
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}

export function BanCheck() {
  const [bannedHotspots, setBannedHotspots] = useState([])
  const [fetchError, setFetchError] = useState(false)

  // This is the raw typed string including possible dashes.
  const [typedInput, setTypedInput] = useState('')
  // The displayed value. If final is valid, we show the final dashed form, else typed.
  const [displayValue, setDisplayValue] = useState('')

  const [matchedHotspot, setMatchedHotspot] = useState(null)
  const [suggestion, setSuggestion] = useState(null)
  const [isSerialValid, setIsSerialValid] = useState(false)

  // The last known fully valid dashed string, for re-check once ban data arrives.
  const [lastValidDashed, setLastValidDashed] = useState('')

  useEffect(() => {
    fetch('https://helium-banned-mobile-hotspots.s3.us-west-2.amazonaws.com/banned.json')
      .then((res) => res.json())
      .then((data) => {
        setBannedHotspots(data)
        setFetchError(false)
      })
      .catch((err) => {
        console.error('Error fetching banned hotspots:', err)
        setBannedHotspots([])
        setFetchError(true)
      })
  }, [])

  useEffect(() => {
    if (bannedHotspots.length > 0 && lastValidDashed) {
      const found = bannedHotspots.find(
        (h) => h.serial.toUpperCase() === lastValidDashed.toUpperCase(),
      )
      setMatchedHotspot(found || null)
    }
  }, [bannedHotspots, lastValidDashed])

  function checkForMatch(serial) {
    if (!isSerialValid) {
      setMatchedHotspot(null)
      return
    }
    const found = bannedHotspots.find((h) => h.serial.toUpperCase() === serial.toUpperCase())
    setMatchedHotspot(found || null)
  }

  function handleChange(e) {
    // Let user type letters, digits, or dashes.
    const raw = e.target.value || ''
    const allowed = stripToAllowed(raw)

    // We'll keep that as typedInput.
    setTypedInput(allowed)

    // For validation, we remove user typed dashes.
    const noDash = removeDashes(allowed)

    // Attempt to insert final dashes if valid.
    const dashed = insertDashes(noDash)
    const valid = validateSerial(dashed)
    setIsSerialValid(valid)

    // If valid, show the final dashed form. Else show the user typed input.
    const displayed = valid ? dashed : allowed
    setDisplayValue(displayed)

    if (valid) {
      setLastValidDashed(dashed)
      checkForMatch(dashed)
    } else {
      setLastValidDashed('')
      setMatchedHotspot(null)
    }

    // SUGGESTION logic
    setSuggestion(null)
    const [userFirst, userSecond, userThird] = parseBlocks(noDash)
    if (userFirst.length >= 2) {
      let candidate = null
      for (const hotspot of bannedHotspots) {
        // remove all dashes from the hotspot's serial
        const hRaw = removeDashes(stripToAllowed(hotspot.serial))
        const [hFirst] = parseBlocks(hRaw)
        if (isCloseBlock(userFirst, hFirst)) {
          const correctedStr = hFirst + userSecond + userThird
          const correctedDashed = insertDashes(correctedStr)
          if (validateSerial(correctedDashed)) {
            candidate = hFirst
            break
          }
        }
      }
      if (candidate && candidate !== userFirst) {
        setSuggestion(candidate)
      }
    }
  }

  function applySuggestion() {
    if (!suggestion) return

    // parse the typed input (minus dashes) into blocks.
    const noDash = removeDashes(typedInput)
    const [userFirst, userSecond, userThird] = parseBlocks(noDash)
    const correctedStr = suggestion + userSecond + userThird

    // re-build typed input with the corrected first block, but keep no dashes?
    // We'll just remove all dashes, combine, and re-check.

    const dashed = insertDashes(correctedStr)
    const valid = validateSerial(dashed)

    // If valid, show final. Else show user typed with a dash?
    if (valid) {
      setDisplayValue(dashed)
      setLastValidDashed(dashed)
      setIsSerialValid(true)
      checkForMatch(dashed)
    } else {
      // put the corrected raw block back into typed input.
      // user typed dashes won't necessarily match up but let's keep it simple.
      const newAllowed = suggestion + userSecond + userThird
      setDisplayValue(newAllowed)
      setIsSerialValid(false)
      setLastValidDashed('')
      setMatchedHotspot(null)
    }

    setTypedInput(correctedStr)
    setSuggestion(null)
  }

  // 1) If matchedHotspot => ban UI.
  // 2) Else if isSerialValid & displayValue.length > 0 => show "valid + not banned" notice.
  const showBannedUi = matchedHotspot !== null
  const showValidNotice = !showBannedUi && isSerialValid && displayValue.length > 0

  return (
    <div className={styles.bancheckContainer}>
      <div className={styles.inputGroup}>
        <label htmlFor="hotspotSerial" className={styles.inputLabel}>
          Enter Hotspot Serial:
        </label>

        <input
          id="hotspotSerial"
          type="text"
          size={20}
          maxLength={20}
          value={displayValue}
          onChange={handleChange}
          aria-describedby="hotspotSerialHelp"
          placeholder="ATI6-2412-00014971"
          className={styles.hotspotInput}
        />
      </div>

      {suggestion && !showBannedUi && (
        <span
          onClick={applySuggestion}
          aria-label={`Click to replace the serial prefix with ${suggestion}`}
          className={styles.inputSuggestion}
        >
          Did you mean <strong>{suggestion}</strong>?
        </span>
      )}

      {showBannedUi && (
        <div role="status" aria-live="polite" className={styles.isBanned_container}>
          <p className={styles.header}>
            The Hotspot <strong>{matchedHotspot && formatHotspotName(matchedHotspot.name)}</strong>{' '}
            is marked as permanently banned.
          </p>
          <p className={styles.publicKey}>
            <strong>Public Key:</strong>{' '}
            <span className={styles.publicKeyTruncate}>{matchedHotspot?.public_key}</span>
          </p>
          <p className={styles.serial}>
            <strong>Serial:</strong>{' '}
            <span style={{ fontFamily: 'courier, mono' }}>{matchedHotspot?.serial}</span>
          </p>
        </div>
      )}

      {showValidNotice && !fetchError && (
        <p className={styles.successNotice}>This Hotspot serial appears valid and is not banned.</p>
      )}

      {fetchError && (
        <p role="alert" className={styles.fetchError}>
          Unable to load banned Hotspot data. Please try again later.
        </p>
      )}
    </div>
  )
}
