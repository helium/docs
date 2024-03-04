import React, { useState } from 'react';

export const Spoiler = ({ children }) => {
  const [revealed, setRevealed] = useState(false);

  
  const styles = {
    obscured: {
      backgroundColor: 'gray',
      cursor: 'pointer',
    },
    revealed: {
      backgroundColor: 'transparent',
      cursor: 'pointer',
    },
    textHidden: {
      visibility: 'hidden',
    },
    textVisible: {
      visibility: 'visible',
    },
  };

  const containerStyle = revealed ? styles.revealed : styles.obscured;
  const textStyle = revealed ? styles.textVisible : styles.textHidden;

  return (
    <div
      style={containerStyle}
      onClick={() => setRevealed(!revealed)}
    >
      <span style={clickableNotice}>Spoiler: </span>
      <span style={textStyle}>{children}</span>
    </div>
  );
};
