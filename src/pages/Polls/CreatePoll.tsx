import { useState, type SubmitEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { findCity } from '../../data/cities'
import { usePolls } from '../../hooks/usePolls'
import { CURRENT_USER } from '../../models/Poll'
import { todayISO } from '../../utils/dates'
import '../Events/Events.css' // reuses the form styles (.event-form, .field-error, .primary-button)
import {
  MAX_OPTIONS,
  MIN_OPTIONS,
  validatePoll,
  type OptionInput,
  type PollForm,
  type PollFormErrors,
} from './validatePoll'
import './Polls.css'

const newOption = (): OptionInput => ({ id: crypto.randomUUID(), label: '' })

function CreatePollPage() {
  const { addPoll } = usePolls()
  const navigate = useNavigate()
  // Function form: new option ids are created once, not on every render
  const [form, setForm] = useState<PollForm>(() => ({
    question: '',
    city: '',
    closesOn: '',
    eventDate: '',
    options: [newOption(), newOption()],
  }))
  const [errors, setErrors] = useState<PollFormErrors>({})

  function update<K extends keyof PollForm>(field: K, value: PollForm[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function updateOption(id: string, label: string) {
    update(
      'options',
      form.options.map((o) => (o.id === id ? { ...o, label } : o)),
    )
  }

  function addOption() {
    if (form.options.length < MAX_OPTIONS)
      update('options', [...form.options, newOption()])
  }

  function removeOption(id: string) {
    if (form.options.length > MIN_OPTIONS)
      update(
        'options',
        form.options.filter((o) => o.id !== id),
      )
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const found = validatePoll(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const city = findCity(form.city)! // validated above
    addPoll({
      question: form.question.trim(),
      askedBy: CURRENT_USER,
      city: city.parent ?? city.name, // "Sontheim" is saved as "Heilbronn", so the city filter finds it
      closesOn: form.closesOn,
      ...(form.eventDate ? { eventDate: form.eventDate } : {}),
      options: form.options
        .filter((o) => o.label.trim())
        .map((o) => ({ id: o.id, label: o.label.trim(), votes: 0 })),
    })
    navigate('/polls', { state: { toast: 'Your poll is live!' } })
  }

  return (
    <section className="create-event">
      <Link to="/polls" className="back-link">
        ← Back to polls
      </Link>
      <h2>Create a poll</h2>

      <form className="event-form" onSubmit={handleSubmit} noValidate>
        <label>
          Question
          <input
            value={form.question}
            maxLength={150}
            onChange={(e) => update('question', e.target.value)}
            placeholder="e.g. Which playdate should we do in January?"
            aria-invalid={!!errors.question}
          />
          {errors.question && (
            <span className="field-error">{errors.question}</span>
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

        <div className="form-row">
          <label>
            Voting closes on
            <input
              type="date"
              min={todayISO()}
              value={form.closesOn}
              onChange={(e) => update('closesOn', e.target.value)}
              aria-invalid={!!errors.closesOn}
            />
            {errors.closesOn && (
              <span className="field-error">{errors.closesOn}</span>
            )}
          </label>
          <label>
            Event date (optional)
            <input
              type="date"
              min={form.closesOn || todayISO()}
              value={form.eventDate}
              onChange={(e) => update('eventDate', e.target.value)}
              aria-invalid={!!errors.eventDate}
            />
            {errors.eventDate && (
              <span className="field-error">{errors.eventDate}</span>
            )}
          </label>
        </div>

        <fieldset className="poll-option-inputs">
          <legend>
            Options ({form.options.length}/{MAX_OPTIONS})
          </legend>
          {form.options.map((option, i) => (
            <div key={option.id} className="poll-option-row">
              <input
                value={option.label}
                maxLength={80}
                onChange={(e) => updateOption(option.id, e.target.value)}
                placeholder={`Option ${i + 1}`}
                aria-label={`Option ${i + 1}`}
              />
              {form.options.length > MIN_OPTIONS && (
                <button
                  type="button"
                  className="remove-option"
                  onClick={() => removeOption(option.id)}
                  aria-label={`Remove option ${i + 1}`}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          {form.options.length < MAX_OPTIONS && (
            <button type="button" className="link-button" onClick={addOption}>
              + Add option
            </button>
          )}
          {errors.options && (
            <span className="field-error">{errors.options}</span>
          )}
        </fieldset>

        <button type="submit" className="primary-button">
          Publish poll
        </button>
      </form>
    </section>
  )
}

export default CreatePollPage
