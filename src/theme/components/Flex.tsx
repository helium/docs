import React from 'react'

export const Flex: React.FunctionComponent<{
  mt?: number
  mr?: number
  px?: number
  py?: number
  align?: string
  width?: string
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justify?: string
  children?: React.ReactNode
}> = ({ align, children, px, mt, mr, py, width, flexDirection, justify }) => {
  return (
    <div
      style={{
        display: 'flex',
        marginTop: mt * 3 + 'px',
        marginRight: mr * 3 + 'px',
        paddingLeft: px * 3 + 'px',
        paddingRight: px * 3 + 'px',
        paddingTop: py * 3 + 'px',
        paddingBottom: py * 3 + 'px',
        flexDirection,
        justifyContent: justify,
        width,
        alignItems: align,
      }}
    >
      {children}
    </div>
  )
}
