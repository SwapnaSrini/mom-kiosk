export type ChildrenEvent = {
  id: string
  title: string
  date: string // "2026-11-21"
  time: string // "10:00"
  place: string
  city: string
  ageRange: string
  description: string
  organizer: string
}

// Data a page can pass to the Create event form to pre-fill it
export type EventPrefill = Partial<Omit<ChildrenEvent, 'id' | 'organizer'>>

export const AGE_RANGES = [
  '0–12 months',
  '1–2 years',
  '2–4 years',
  'All ages',
] as const
