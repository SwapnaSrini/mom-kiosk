import Anthropic from '@anthropic-ai/sdk'

const MODEL = 'claude-haiku-5-5' // fastest, cheapest model, ideal for short texts

export type EventDraftInput = {
  title: string
  date: string
  time: string
  place: string
  city: string
  ageRange: string
  notes: string
}

export type EventDraft = { title: string; description: string }

const SYSTEM_PROMPT = `You write short, warm event descriptions for MOM-KIOSK, a community app where parents around Heilbronn, Germany organise playdates for babies and toddlers.
Rules:
- 2 to 4 sentences, at most 70 words, friendly and practical.
- Say what families will do and, if useful, what to bring.
- Use only the details given. Never invent prices, addresses, phone numbers or names.
- Write in English.
- If a title is given, keep it (fix spelling only). Otherwise suggest a title under 8 words.
Respond with only a JSON object: {"title": "...", "description": "..."}`

// Created on first use, so a missing key gives a clear error instead of crashing the server at startup
let client: Anthropic | null = null
function getClient(): Anthropic {
  client ??= new Anthropic() // reads ANTHROPIC_API_KEY from process.env
  return client
}

function isEventDraft(value: unknown): value is EventDraft {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as EventDraft).title === 'string' &&
    typeof (value as EventDraft).description === 'string'
  )
}

export async function draftEventDescription(
  input: EventDraftInput,
): Promise<EventDraft> {
  const details = [
    input.title && `Title: ${input.title}`,
    input.date && `Date: ${input.date}`,
    input.time && `Time: ${input.time}`,
    input.place && `Place: ${input.place}`,
    input.city && `City: ${input.city}`,
    input.ageRange && `Age range: ${input.ageRange}`,
    input.notes && `Organiser's notes: ${input.notes}`,
  ]
    .filter(Boolean)
    .join('\n')

  const message = await getClient().messages.create({
    model: MODEL,
    // Haiku 5.5 thinks by default, and thinking tokens count toward max_tokens.
    // A short JSON reply doesn't need it, and leaving it on cut the JSON off mid-way.
    thinking: { type: 'disabled' },
    max_tokens: 600, // caps length and cost; the reply itself is ~120 tokens
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: `Event details:\n${details}` }],
  })

  if (message.stop_reason === 'max_tokens')
    throw new Error('AI reply was cut off (hit max_tokens)')

  // Collect the text parts of the answer and pull out the JSON object
  const text = message.content
    .flatMap((block) => (block.type === 'text' ? [block.text] : []))
    .join('')
  const json = text.match(/\{[\s\S]*\}/)?.[0]
  if (!json) throw new Error('AI returned no JSON')

  const parsed: unknown = JSON.parse(json)
  if (!isEventDraft(parsed)) throw new Error('AI returned an unexpected shape')

  return { title: parsed.title.trim(), description: parsed.description.trim() }
}
