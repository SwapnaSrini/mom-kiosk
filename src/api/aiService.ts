export type EventDraftRequest = {
  title: string
  date: string
  time: string
  place: string
  city: string
  ageRange: string
  notes: string
}

export type EventDraft = { title: string; description: string }

export async function draftEventDescription(
  input: EventDraftRequest,
): Promise<EventDraft> {
  const res = await fetch('/api/ai/event-description', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok)
    throw new Error(data.error ?? 'Something went wrong. Please try again.')
  return data as EventDraft
}
