import { useState, type SubmitEvent } from 'react'
import './LocationSearch.css'

type LocationSearchProps = {
  initialQuery: string
  invalid: boolean
  onSearch: (text: string) => void
}

function LocationSearch({
  initialQuery,
  invalid,
  onSearch,
}: LocationSearchProps) {
  const [query, setQuery] = useState(initialQuery)

  function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch(query)
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
      {invalid && (
        <p className="search-error" role="alert">
          Type the name of a city in Germany
        </p>
      )}
    </div>
  )
}

export default LocationSearch
