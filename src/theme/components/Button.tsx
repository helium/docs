import React from 'react'
import { CgSpinner } from 'react-icons/cg'
import { Flex } from './Flex'
import { Icon } from './Icon'

export const Button: React.FunctionComponent<{
  colorScheme?: string
  isLoading?: boolean
  onClick?: () => void
  isDisabled?: boolean
  leftIcon?: React.ReactNode
  w?: string
  children: React.ReactNode
  mr?: number
  size?: string
  mt?: number
}> = ({ colorScheme, isLoading, onClick, isDisabled, leftIcon, children, w, mr, mt, size }) => {
  return (
    <button
      disabled={isDisabled || isLoading}
      className={`button button--${colorScheme} button--${size}`}
      style={{
        width: w,
        marginRight: mr ? mr * 3 + 'px' : undefined,
        marginTop: mt ? mt * 3 + 'px' : undefined,
      }}
      onClick={onClick}
    >
      <Flex flexDirection="row" justify="center" align="center">
        {leftIcon && <Flex mr={3}>{leftIcon}</Flex>}
        {isLoading && <Icon spin mr={3} as={CgSpinner} />}
        {children}
      </Flex>
    </button>
  )
}
