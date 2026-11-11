import type { ChildrenEvent } from '../models/ChildrenEvent'
import { formatEventDate } from '../utils/dates'
import './EventCard.css'

function EventCard({ event }: { event: ChildrenEvent }) {
  return (
    <article className="event-card">
      <p className="event-date">{formatEventDate(event.date, event.time)}</p>
      <h3 className="event-title">{event.title}</h3>
      <p className="event-meta">
        📍 {event.place}, {event.city}
      </p>
      <p className="event-meta">👶 {event.ageRange}</p>
      <p className="event-description">{event.description}</p>
      <p className="event-organizer">Organised by {event.organizer}</p>
    </article>
  )
}

export default EventCard
