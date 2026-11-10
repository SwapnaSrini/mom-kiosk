import { useCallback, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import EventCard from '../../components/EventCard'
import Toast from '../../components/Toast'
import { useEvents } from '../../hooks/useEvents'
import {
  cityLabel,
  filterByLocation,
  type LocationFilter,
} from '../../data/cities'
import './Events.css'

function ViewEventsPage({
  locationFilter,
}: {
  locationFilter: LocationFilter
}) {
  // 1. All hooks first, before any return
  const { events } = useEvents()
  const location = useLocation()
  const navigate = useNavigate()

  const [toast, setToast] = useState<string | null>(
    (location.state as { toast?: string } | null)?.toast ?? null,
  )
  const closeToast = useCallback(() => {
    setToast(null)
    navigate('.', { replace: true, state: null }) // so a refresh doesn't show it again
  }, [navigate])

  // 2. Then plain calculations
  const visibleEvents = filterByLocation(events, locationFilter, (e) => e.city)

  // 3. Early returns only after all hooks
  if (locationFilter.kind === 'invalid') return null

  return (
    <section>
      <div className="events-header">
        <h2>
          {locationFilter.kind === 'city'
            ? `Children Events in ${cityLabel(locationFilter.city)}`
            : 'Upcoming children events'}
        </h2>
        <Link to="/events/new" className="primary-button">
          + Create event
        </Link>
      </div>

      {visibleEvents.length === 0 ? (
        <p>No upcoming children events here yet. Be the first to create one!</p>
      ) : (
        <div className="events-grid">
          {visibleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {toast && <Toast message={toast} onClose={closeToast} />}
    </section>
  )
}

export default ViewEventsPage
