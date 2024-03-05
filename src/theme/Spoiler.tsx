import React, { useState } from 'react'

export const Spoiler = ({ children }) => {
  const [revealed, setRevealed] = useState(false)

  const styles = {
    containerRevealed: {
      cursor: 'pointer',
    },
    containerObscured: {
      backgroundColor: '#f5f7fd',
      cursor: 'pointer',
      position: 'relative',
      borderRadius: '24px',
      overflow: 'hidden',
    },
    textVisible: {},
    textHidden: {
      //keep text rendered on screen for screenreaders
      filter: 'blur(4px)',
      opacity: '0.2',
    },
    clickableNoticeActive: {
      backgroundColor: 'white',
      position: 'absolute',
      left: '50%',
      padding: '0.25em 1em',
      transform: 'translateX(-50%) translateY(50%)',
      borderRadius: '100px',
      border: '1px solid #e4e4ee',
      zIndex: '1',
    },
    clickableNoticeInactive: {
      display: 'none',
    },
  }

  const containerStyle = revealed ? styles.containerRevealed : styles.containerObscured
  const textStyle = revealed ? styles.textVisible : styles.textHidden
  const clickableNotice = revealed ? styles.clickableNoticeInactive : styles.clickableNoticeActive

  return (
    <div style={containerStyle} onClick={() => setRevealed(!revealed)}>
      <span style={clickableNotice}>Reveal</span>
      <span style={textStyle}>{children}</span>
    </div>
  )
}
