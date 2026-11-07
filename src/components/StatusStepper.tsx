import type { RequestStatus } from '../hooks/useRequestStatus'
import './StatusStepper.css'

export type Step = { status: RequestStatus; label: string }

function StatusStepper({
  steps,
  current,
}: {
  steps: Step[]
  current: RequestStatus
}) {
  const currentIndex = steps.findIndex((s) => s.status === current)

  return (
    <ol className="stepper" aria-label="Request status">
      {steps.map((step, i) => {
        const done = i <= currentIndex
        return (
          <li
            key={step.status}
            className={`step${done ? ' done' : ''}`}
            aria-current={i === currentIndex ? 'step' : undefined}
          >
            <span className="step-circle" aria-hidden="true">
              {done ? '✓' : ''}
            </span>
            <span className="step-label">{step.label}</span>
          </li>
        )
      })}
    </ol>
  )
}

export default StatusStepper
