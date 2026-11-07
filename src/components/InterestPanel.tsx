import { useCallback, useState } from 'react'
import { useRequestStatus } from '../hooks/useRequestStatus'
import StatusStepper, { type Step } from './StatusStepper'
import Toast from './Toast'
import type { Product } from '../models/Product'
import './InterestPanel.css'

const STEPS: Step[] = [
  { status: 'requested', label: 'Requested' },
  { status: 'reserved', label: 'Reserved' },
  { status: 'picked-up', label: 'Picked up' },
]

function InterestPanel({ product }: { product: Product }) {
  const [status, setStatus] = useRequestStatus(product.id)
  const [toast, setToast] = useState<string | null>(null)
  // stable function, so the toast's timer isn't restarted on every render
  const closeToast = useCallback(() => setToast(null), [])
  const seller = product.sellerName ?? 'The seller'

  function handleInterested() {
    setStatus('requested')
    setToast(
      "Expressed interest to the seller. Please wait for the seller's response.",
    )
  }

  return (
    <>
      {status === null ? (
        <button className="contact-button" onClick={handleInterested}>
          I am interested
        </button>
      ) : (
        <div className="interest-panel">
          <StatusStepper steps={STEPS} current={status} />

          <p className="interest-message">
            {status === 'requested' && `Waiting for ${seller} to respond.`}
            {status === 'reserved' && `${seller} reserved this item for you.`}
          </p>

          {status === 'requested' && (
            <div className="interest-actions">
              <button onClick={() => setStatus('reserved')}>
                Demo: seller accepts
              </button>
              <button className="link-button" onClick={() => setStatus(null)}>
                Cancel request
              </button>
            </div>
          )}
        </div>
      )}

      {toast && <Toast message={toast} onClose={closeToast} />}
    </>
  )
}

export default InterestPanel
