import React from 'react'
import { FaExclamationCircle } from 'react-icons/fa'


export const AlertIcon: React.FunctionComponent = () => {
  return <FaExclamationCircle />
}

export const Alert: React.FunctionComponent<{
  children: React.ReactNode
  status: 'error' | 'warning'
}> = ({ children }) => {
  return (
    <div className={`alert alert--${status == 'error' ? 'danger' : 'warning'}`} role="alert">
      {children}
    </div>
  )
}
