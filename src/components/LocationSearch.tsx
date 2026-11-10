import { useState, type SubmitEvent } from 'react'
import { findCity, type LocationFilter } from '../data/cities'
import './LocationSearch.css'

function LocationSearch({
  onChange,
}: {
  onChange: (filter: LocationFilter) => void
}) {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (query.trim() === '') {
      setError('')
      onChange({ kind: 'all' })
      return
    }
    const city = findCity(query)
    if (!city) {
      setError('Type the name of a city in Germany')
      onChange({ kind: 'invalid' })
      return
    }
    setError('')
    onChange({ kind: 'city', city })
  }

  return (
    <div className="location-search-wrapper">
      <form className="location-search" onSubmit={handleSearch}>
        <label htmlFor="city">📍 Your city</label>
        <input
          id="city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Heilbronn"
        />
        <button type="submit">Search</button>
      </form>
      {error && (
        <p className="search-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default LocationSearch
