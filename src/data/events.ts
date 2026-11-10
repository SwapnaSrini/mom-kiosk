import type { ChildrenEvent } from '../models/ChildrenEvent.js'

export const seedEvents: ChildrenEvent[] = [
  {
    id: 'e1',
    title: 'Toddler morning in Pfühlpark',
    date: '2026-11-21',
    time: '10:00',
    place: 'Pfühlpark, main playground',
    city: 'Heilbronn',
    ageRange: '1–2 years',
    description:
      "Fresh air and sandpit time before the winter. Bring a thermos and a snack; we'll meet at the big climbing frame.",
    organizer: 'Katja Niels',
  },
  {
    id: 'e2',
    title: 'Baby & me coffee meetup',
    date: '2026-11-25',
    time: '15:00',
    place: 'Café near Böckingen station',
    city: 'Heilbronn',
    ageRange: '0–12 months',
    description:
      'A relaxed coffee for new moms. Prams welcome, crying babies even more welcome. Come for 20 minutes or two hours.',
    organizer: 'Elsa Müller',
  },
  {
    id: 'e3',
    title: 'Rainy-day play group',
    date: '2026-11-28',
    time: '10:30',
    place: 'Community room, Neckarsulm-Amorbach',
    city: 'Neckarsulm',
    ageRange: '1–2 years',
    description:
      'Indoor play with soft blocks, books and music. Please bring socks for the little ones and something small to share.',
    organizer: 'Hannah Klaus',
  },
  {
    id: 'e4',
    title: 'Advent craft afternoon',
    date: '2026-12-05',
    time: '14:00',
    place: 'Family centre, Weinsberg',
    city: 'Weinsberg',
    ageRange: '2–4 years',
    description:
      'Finger paint, salt dough stars and Christmas songs. Old clothes recommended. Biscuits and tea provided.',
    organizer: 'Marlene Zimmer',
  },
]
