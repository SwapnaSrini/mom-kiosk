import { useEffect } from 'react'
import './Toast.css'

type ToastProps = { message: string; onClose: () => void; duration?: number }

function Toast({ message, onClose, duration = 4000 }: ToastProps) {
  // Auto-close after `duration`; restart the timer if a new message comes in
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [message, onClose, duration])

  return (
    <div className="toast" role="status" aria-live="polite">
      <span>{message}</span>
      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  )
}

export default Toast
