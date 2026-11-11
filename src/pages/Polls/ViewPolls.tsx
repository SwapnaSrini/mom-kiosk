import { useNavigate } from 'react-router-dom'
import PollCard from '../../components/PollCard'
import { polls } from '../../data/polls'
import { CURRENT_USER, pollToEvent } from '../../models/Poll'
import {
  cityLabel,
  filterByLocation,
  type LocationFilter,
} from '../../data/cities'
import { usePollVotes } from '../../hooks/usePollVotes'
import './Polls.css'

function ViewPollsPage({ locationFilter }: { locationFilter: LocationFilter }) {
  const { votes, vote, clearVote } = usePollVotes()
  const navigate = useNavigate()

  const visiblePolls = filterByLocation(polls, locationFilter, (p) => p.city)
  if (locationFilter.kind === 'invalid') return null

  return (
    <section className="tab-page">
      <h2>
        {locationFilter.kind === 'city'
          ? `Polls in ${cityLabel(locationFilter.city)}`
          : 'Community polls'}
      </h2>

      {visiblePolls.length === 0 ? (
        <p>No polls here yet.</p>
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
    </section>
  )
}

export default ViewPollsPage
