import React from 'react'

export const Icon: React.FunctionComponent<{ spin?: boolean; mr?: number; as: any }> = ({
  spin,
  as: children,
  mr,
}) => {
  return (
    <div className={spin ? 'spin' : ''} style={{ display: 'flex', marginRight: 3 * mr + 'px' }}>
      {React.createElement(children)}
    </div>
  )
}
