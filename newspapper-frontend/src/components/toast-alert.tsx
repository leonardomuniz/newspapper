'use client'

import { useEffect, useState } from 'react'

export interface ToastAlertProps {
  message: string
  duration?: number
  type?: 'success' | 'error'
  onClose?: () => void
}

function ToastAlert({ message, duration = 3000, type = 'success', onClose }: ToastAlertProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!visible) return null

  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600'

  return <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-md shadow-lg z-50 transition-opacity duration-300`}>{message}</div>
}

export default ToastAlert
