import { findCity } from '../../data/cities'
import { todayISO } from '../../utils/dates'

export type OptionInput = { id: string; label: string }

export type PollForm = {
  question: string
  city: string
  closesOn: string
  eventDate: string
  options: OptionInput[]
}

export type PollFormErrors = Partial<
  Record<'question' | 'city' | 'closesOn' | 'eventDate' | 'options', string>
>

export const MIN_OPTIONS = 2
export const MAX_OPTIONS = 4

export function validatePoll(form: PollForm): PollFormErrors {
  const errors: PollFormErrors = {}

  if (!form.question.trim()) errors.question = 'What do you want to ask?'
  if (!findCity(form.city)) errors.city = 'Type the name of a city in Germany'

  if (!form.closesOn) errors.closesOn = 'When should voting close?'
  else if (form.closesOn < todayISO())
    errors.closesOn = 'This date is in the past'

  if (form.eventDate && form.closesOn && form.eventDate < form.closesOn) {
    errors.eventDate = 'The event should be after voting closes'
  }

  const labels = form.options
    .map((o) => o.label.trim().toLowerCase())
    .filter(Boolean)
  if (labels.length < MIN_OPTIONS) errors.options = 'Add at least 2 options'
  else if (new Set(labels).size !== labels.length)
    errors.options = 'Each option must be different'

  return errors
}
