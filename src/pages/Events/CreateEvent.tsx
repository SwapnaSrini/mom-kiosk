import { useState, type SubmitEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEvents } from '../../hooks/useEvents'
import {
  AGE_RANGES,
  type ChildrenEvent,
  type EventPrefill,
} from '../../models/ChildrenEvent'
import { todayISO } from '../../utils/dates'
import './Events.css'
import { draftEventDescription } from '../../api/aiService'

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
  const location = useLocation()
  const prefill = (location.state as { prefill?: EventPrefill } | null)?.prefill
  const [form, setForm] = useState<EventForm>({ ...EMPTY_FORM, ...prefill })
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

  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  async function handleWriteForMe() {
    setAiError('')
    if (!form.title.trim() && !form.description.trim()) {
      setAiError('Add a title or a few words in the description first.')
      return
    }

    setAiLoading(true)
    try {
      const draft = await draftEventDescription({
        title: form.title,
        date: form.date,
        time: form.time,
        place: form.place,
        city: form.city,
        ageRange: form.ageRange,
        notes: form.description, // what the user typed becomes the AI's notes
      })
      setForm((prev) => ({
        ...prev,
        title: prev.title.trim() ? prev.title : draft.title, // never overwrite the user's own title
        description: draft.description,
      }))
      setErrors((prev) => {
        const next = { ...prev }
        delete next.title
        delete next.description
        return next
      })
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setAiLoading(false)
    }
  }
  return (
    <section className="create-event">
      <Link to="/events" className="back-link">
        ← Back to events
      </Link>
      <h2>
        Create a children's event
        {prefill && (
          <p className="ai-hint">
            Pre-filled from the poll. Add a time and place, then let ✨ write
            the description.
          </p>
        )}
      </h2>

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

        <div className="description-field">
          <div className="description-header">
            <label htmlFor="description">Description</label>
            <button
              type="button"
              className="ai-button"
              onClick={handleWriteForMe}
              disabled={aiLoading}
            >
              {aiLoading ? 'Writing…' : '✨ Write it for me'}
            </button>
          </div>
          <textarea
            id="description"
            rows={5}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder='A few words are enough, e.g. "park, games, bring warm clothes"'
            aria-invalid={!!errors.description}
          />
          {errors.description && (
            <span className="field-error">{errors.description}</span>
          )}
          {aiError && (
            <span className="field-error" role="alert">
              {aiError}
            </span>
          )}
          <span className="ai-hint">
            AI writes a draft from your details. You can edit it before saving.
          </span>
        </div>

        <button type="submit" className="primary-button">
          Create event
        </button>
      </form>
    </section>
  )
}

export default CreateEventPage
