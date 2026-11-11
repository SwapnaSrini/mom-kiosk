import type { EventPrefill } from './ChildrenEvent'

export type PollOption = { id: string; label: string; votes: number }

export type Poll = {
  id: string
  question: string
  askedBy: string
  city: string
  closesOn: string // "2026-12-06"
  eventDate?: string // when the winning event would take place, if known
  options: PollOption[] // 2–4
}

// No login yet: "You" is the current user
export const CURRENT_USER = 'You'

// The winning option becomes a pre-filled event (plain data, works for any poll)
export function pollToEvent(poll: Poll, winner: PollOption): EventPrefill {
  return {
    title: winner.label,
    city: poll.city,
    ...(poll.eventDate ? { date: poll.eventDate } : {}),
    description: `Chosen by the community in the poll "${poll.question}"`,
  }
}
