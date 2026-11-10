import { useState } from 'react'
import { seedEvents } from '../data/events.js'
import type { ChildrenEvent } from '../models/ChildrenEvent.js'
import { todayISO } from '../utils/dates.js'

const STORAGE_KEY = 'mom-kiosk:events'

function readCreated(): ChildrenEvent[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function useEvents() {
  const [created, setCreated] = useState(readCreated)

  // Example events + the user's own, upcoming only, soonest first
  const today = todayISO()
  const events = [...seedEvents, ...created]
    .filter((e) => e.date >= today)
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))

  function addEvent(input: Omit<ChildrenEvent, 'id'>): ChildrenEvent {
    const event = { ...input, id: crypto.randomUUID() }
    const next = [...created, event]
    setCreated(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* storage blocked: event lives in memory only */
    }
    return event
  }

  return { events, addEvent }
}
