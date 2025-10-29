import React from 'react'
import { FaExclamationCircle } from 'react-icons/fa'

export const AlertIcon: React.FunctionComponent = () => {
  return <FaExclamationCircle />
}

export const Alert: React.FunctionComponent<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div className="alert alert--danger" role="alert">
      {children}
    </div>
  )
}
