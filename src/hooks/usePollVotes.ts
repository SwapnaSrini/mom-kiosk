import { useState } from 'react'

const STORAGE_KEY = 'mom-kiosk:poll-votes'
type Votes = Record<string, string> // pollId → optionId

function readVotes(): Votes {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

export function usePollVotes() {
  const [votes, setVotes] = useState<Votes>(readVotes)

  function save(next: Votes) {
    setVotes(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* storage blocked: votes live in memory only */
    }
  }

  function vote(pollId: string, optionId: string) {
    save({ ...votes, [pollId]: optionId })
  }

  function clearVote(pollId: string) {
    const next = { ...votes }
    delete next[pollId]
    save(next)
  }

  return { votes, vote, clearVote }
}
