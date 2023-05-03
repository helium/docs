import React from 'react'
import { Flex } from './Flex'

export const Checkbox: React.FunctionComponent<{
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  isChecked?: boolean
  children?: React.ReactNode
}> = ({ isChecked, onChange, children }) => {
  return (
    <Flex flexDirection="row">
      <input type="checkbox" onChange={onChange} checked={isChecked} />
      {children}
    </Flex>
  )
}
