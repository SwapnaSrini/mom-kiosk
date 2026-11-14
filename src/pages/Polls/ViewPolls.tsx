import { useCallback, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PollCard from '../../components/PollCard'
import Toast from '../../components/Toast'
import {
  cityLabel,
  filterByLocation,
  type LocationFilter,
} from '../../data/cities'
import { usePolls } from '../../hooks/usePolls'
import { usePollVotes } from '../../hooks/usePollVotes'
import { CURRENT_USER, pollToEvent } from '../../models/Poll'
import '../Events/Events.css' // .primary-button
import './Polls.css'

function ViewPollsPage({ locationFilter }: { locationFilter: LocationFilter }) {
  // Hooks first
  const { polls } = usePolls()
  const { votes, vote, clearVote } = usePollVotes()
  const location = useLocation()
  const navigate = useNavigate()

  const [toast, setToast] = useState<string | null>(
    (location.state as { toast?: string } | null)?.toast ?? null,
  )
  const closeToast = useCallback(() => {
    setToast(null)
    navigate('.', { replace: true, state: null })
  }, [navigate])

  // Then calculations, then early returns
  const visiblePolls = filterByLocation(polls, locationFilter, (p) => p.city)
  if (locationFilter.kind === 'invalid') return null

  return (
    <section className="tab-page">
      <div className="page-header polls-header">
        <h2>
          {locationFilter.kind === 'city'
            ? `Polls in ${cityLabel(locationFilter.city)}`
            : 'Community polls'}
        </h2>
        <Link to="/polls/new" className="primary-button">
          + Create poll
        </Link>
      </div>

      {visiblePolls.length === 0 ? (
        <p>No polls here yet. Ask your community something!</p>
      ) : (
        <div className="polls-grid">
          {visiblePolls.map((poll) => (
            <PollCard
              key={poll.id}
              poll={poll}
              isMine={poll.askedBy === CURRENT_USER}
              myVote={votes[poll.id]}
              onVote={(optionId) => vote(poll.id, optionId)}
              onChangeVote={() => clearVote(poll.id)}
              onPlanEvent={(winner) =>
                navigate('/events/new', {
                  state: { prefill: pollToEvent(poll, winner) },
                })
              }
            />
          ))}
        </div>
      )}

      {toast && <Toast message={toast} onClose={closeToast} />}
    </section>
  )
}

export default ViewPollsPage
