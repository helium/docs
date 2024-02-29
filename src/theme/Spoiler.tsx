import React, { useState } from 'react'

export const Spoiler = ({ children }) => {
  const [revealed, setRevealed] = useState(false)

  return (
    <div
      style={{
        backgroundColor: revealed ? undefined : 'gray',
        cursor: 'pointer',
      }}
      onClick={() => setRevealed(!revealed)}
    >
      <span style={{ visibility: revealed ? 'visible' : 'hidden' }}>{children}</span>
    </div>
  )
}
