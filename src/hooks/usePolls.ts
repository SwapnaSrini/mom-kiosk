import { useState } from 'react'
import { polls as seedPolls } from '../data/polls'
import type { Poll } from '../models/Poll'

const STORAGE_KEY = 'mom-kiosk:polls'

function readCreated(): Poll[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function usePolls() {
  const [created, setCreated] = useState(readCreated)

  // Your newest polls first, then the example polls
  const polls = [...[...created].reverse(), ...seedPolls]

  function addPoll(input: Omit<Poll, 'id'>): Poll {
    const poll = { ...input, id: crypto.randomUUID() }
    const next = [...created, poll]
    setCreated(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* storage blocked: poll lives in memory only */
    }
    return poll
  }

  return { polls, addPoll }
}
