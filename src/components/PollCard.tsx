import { useState, type SubmitEvent } from 'react'
import type { Poll, PollOption } from '../models/Poll'
import { formatEventDate } from '../utils/dates'
import './PollCard.css'

type PollCardProps = {
  poll: Poll
  isMine: boolean
  myVote: string | undefined
  onVote: (optionId: string) => void
  onChangeVote: () => void
  onPlanEvent: (winner: PollOption) => void
}

function PollCard({
  poll,
  isMine,
  myVote,
  onVote,
  onChangeVote,
  onPlanEvent,
}: PollCardProps) {
  const [selected, setSelected] = useState('')

  // Example votes + my own vote
  const results = poll.options.map((option) => ({
    ...option,
    count: option.votes + (myVote === option.id ? 1 : 0),
  }))
  const total = results.reduce((sum, r) => sum + r.count, 0)
  const winner = results.reduce((best, r) => (r.count > best.count ? r : best))

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (selected) onVote(selected)
  }

  return (
    <article className="poll-card">
      <p className="poll-meta">
        📍 {poll.city} · {isMine ? 'your poll' : `asked by ${poll.askedBy}`} ·
        closes {formatEventDate(poll.closesOn, '00:00').split(',')[0]}
      </p>

      {myVote === undefined ? (
        // Before voting: choose an option
        <form onSubmit={handleSubmit}>
          <fieldset className="poll-options">
            <legend className="poll-question">{poll.question}</legend>
            {poll.options.map((option) => (
              <label key={option.id} className="poll-option">
                <input
                  type="radio"
                  name={`poll-${poll.id}`}
                  value={option.id}
                  checked={selected === option.id}
                  onChange={() => setSelected(option.id)}
                />
                {option.label}
              </label>
            ))}
          </fieldset>
          <button type="submit" className="primary-button" disabled={!selected}>
            Vote
          </button>
        </form>
      ) : (
        // After voting: results
        <>
          <h3 className="poll-question">{poll.question}</h3>
          <ul className="poll-results">
            {results.map((r) => {
              const percent = Math.round((r.count / total) * 100)
              return (
                <li key={r.id} className={r.id === myVote ? 'mine' : ''}>
                  <div className="poll-result-label">
                    <span>
                      {r.label}
                      {r.id === myVote && ' ✓'}
                    </span>
                    <span>{percent}%</span>
                  </div>
                  <div className="poll-bar" aria-hidden="true">
                    <div
                      className="poll-bar-fill"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
          <p className="poll-total">{total} votes</p>

          <div className="poll-actions">
            <div className="poll-actions">
              {isMine ? (
                <button
                  className="primary-button"
                  onClick={() => onPlanEvent(winner)}
                >
                  Plan this event →
                </button>
              ) : (
                <p className="poll-note">
                  {poll.askedBy} will plan the winning event.
                </p>
              )}
              <button className="link-button" onClick={onChangeVote}>
                Change vote
              </button>
            </div>
          </div>
        </>
      )}
    </article>
  )
}

export default PollCard
