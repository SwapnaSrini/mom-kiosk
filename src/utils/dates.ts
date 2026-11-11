// Today as "YYYY-MM-DD" in local time (same format as <input type="date">)
export function todayISO(): string {
  const d = new Date()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}

// "2026-11-21" + "10:00" → "Sat 21 Nov, 10:00"
export function formatEventDate(date: string, time: string): string {
  return new Date(`${date}T${time}`).toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
