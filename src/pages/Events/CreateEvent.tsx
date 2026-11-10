import { useState, type SubmitEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEvents } from '../../hooks/useEvents'
import { AGE_RANGES, type ChildrenEvent } from '../../models/ChildrenEvent'
import { todayISO } from '../../utils/dates'
import './Events.css'

type EventForm = Omit<ChildrenEvent, 'id' | 'organizer'>
type FormErrors = Partial<Record<keyof EventForm, string>>

const EMPTY_FORM: EventForm = {
  title: '',
  date: '',
  time: '',
  place: '',
  city: '',
  ageRange: AGE_RANGES[1],
  description: '',
}

function validate(form: EventForm): FormErrors {
  const errors: FormErrors = {}
  if (!form.title.trim()) errors.title = 'Give your event a title'
  if (!form.date) errors.date = 'Pick a date'
  else if (form.date < todayISO()) errors.date = "The date can't be in the past"
  if (!form.time) errors.time = 'Pick a time'
  if (!form.place.trim()) errors.place = 'Where will you meet?'
  if (!form.city.trim()) errors.city = 'Which city?'
  if (!form.description.trim())
    errors.description = 'Tell other moms what to expect'
  return errors
}

function CreateEventPage() {
  const { addEvent } = useEvents()
  const navigate = useNavigate()
  const [form, setForm] = useState<EventForm>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})

  // One typed setter for every field
  function update<K extends keyof EventForm>(field: K, value: EventForm[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    addEvent({ ...form, organizer: 'You' })
    navigate('/events', { state: { toast: 'Your event was created!' } })
  }

  return (
    <section className="create-event">
      <Link to="/events" className="back-link">
        ← Back to events
      </Link>
      <h2>Create a children's event</h2>

      <form className="event-form" onSubmit={handleSubmit} noValidate>
        <label>
          Title
          <input
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="e.g. Toddler morning in the park"
            aria-invalid={!!errors.title}
          />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </label>

        <div className="form-row">
          <label>
            Date
            <input
              type="date"
              min={todayISO()}
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
              aria-invalid={!!errors.date}
            />
            {errors.date && <span className="field-error">{errors.date}</span>}
          </label>
          <label>
            Time
            <input
              type="time"
              value={form.time}
              onChange={(e) => update('time', e.target.value)}
              aria-invalid={!!errors.time}
            />
            {errors.time && <span className="field-error">{errors.time}</span>}
          </label>
        </div>

        <div className="form-row">
          <label>
            Place
            <input
              value={form.place}
              onChange={(e) => update('place', e.target.value)}
              placeholder="e.g. Pfühlpark playground"
              aria-invalid={!!errors.place}
            />
            {errors.place && (
              <span className="field-error">{errors.place}</span>
            )}
          </label>
          <label>
            City
            <input
              value={form.city}
              onChange={(e) => update('city', e.target.value)}
              placeholder="e.g. Heilbronn"
              aria-invalid={!!errors.city}
            />
            {errors.city && <span className="field-error">{errors.city}</span>}
          </label>
        </div>

        <label>
          Age range
          <select
            value={form.ageRange}
            onChange={(e) => update('ageRange', e.target.value)}
          >
            {AGE_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </label>

        <label>
          Description
          {/* ✨ "Write it for me" AI button comes here tomorrow */}
          <textarea
            rows={5}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="What will you do? What should parents bring?"
            aria-invalid={!!errors.description}
          />
          {errors.description && (
            <span className="field-error">{errors.description}</span>
          )}
        </label>

        <button type="submit" className="primary-button">
          Create event
        </button>
      </form>
    </section>
  )
}

export default CreateEventPage
