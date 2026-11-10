import { useCallback, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import EventCard from '../../components/EventCard'
import Toast from '../../components/Toast'
import { useEvents } from '../../hooks/useEvents'
import './Events.css'

function ViewEventsPage() {
  const { events } = useEvents()
  const location = useLocation()
  const navigate = useNavigate()

  // The create form sends a toast message along when it navigates back here
  const [toast, setToast] = useState<string | null>(
    (location.state as { toast?: string } | null)?.toast ?? null,
  )
  const closeToast = useCallback(() => {
    setToast(null)
    navigate('.', { replace: true, state: null }) // so a refresh doesn't show it again
  }, [navigate])

  return (
    <section>
      <div className="events-header">
        <h2>Upcoming playdates</h2>
        <Link to="/events/new" className="primary-button">
          + Create event
        </Link>
      </div>

      {events.length === 0 ? (
        <p>No upcoming playdates yet. Be the first to create one!</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {toast && <Toast message={toast} onClose={closeToast} />}
    </section>
  )
}

export default ViewEventsPage
