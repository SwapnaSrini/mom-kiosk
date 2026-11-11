import type { Poll } from '../models/Poll'

export const polls: Poll[] = [
  {
    id: 'p1',
    question:
      "Which children's event do you want next for Advent, on Sat 19 Dec?",
    askedBy: 'You',
    city: 'Heilbronn',
    closesOn: '2026-12-06',
    eventDate: '2026-12-19',
    options: [
      { id: 'a', label: 'Indoor family yoga session', votes: 6 },
      { id: 'b', label: 'Outdoor Santa Claus meet-up and games', votes: 14 },
      { id: 'c', label: 'Indoor rock climbing for kids', votes: 4 },
      {
        id: 'd',
        label: 'Outdoor scavenger hunt for kids and adults',
        votes: 9,
      },
    ],
  },
  {
    id: 'p2',
    question: 'Best time for a weekly baby coffee meetup?',
    askedBy: 'Hannah Klaus',
    city: 'Neckarsulm',
    closesOn: '2026-11-29',
    options: [
      { id: 'a', label: 'Weekday mornings', votes: 11 },
      { id: 'b', label: 'Weekday afternoons', votes: 7 },
      { id: 'c', label: 'Saturday mornings', votes: 5 },
      { id: 'd', label: 'Sunday afternoons', votes: 2 },
    ],
  },
  {
    id: 'p3',
    question: "Which topic for the next parents' evening?",
    askedBy: 'Elsa Müller',
    city: 'Heilbronn',
    closesOn: '2026-12-01',
    options: [
      { id: 'a', label: 'Baby sleep', votes: 12 },
      { id: 'b', label: 'Starting solids', votes: 8 },
      { id: 'c', label: 'Kita Eingewöhnung', votes: 15 },
      { id: 'd', label: 'Going back to work', votes: 10 },
    ],
  },
]
