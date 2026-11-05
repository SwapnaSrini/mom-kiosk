import { useState, type SubmitEvent } from 'react'
import ProductItemCard from '../../components/ProductItemCard'
import { products } from '../../data/ProductData_new'
import { findCity, isInCity, type City } from '../../data/cities'
import './ProductsList.css'

function ProductsListPage() {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState<City | null>(null)
  const [error, setError] = useState('')

  function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (query.trim() === '') {
      setCity(null)
      setError('')
      return
    } // empty = show all
    const found = findCity(query)
    if (!found) {
      setCity(null)
      setError('Type the name of a city in Germany')
      return
    }
    setError('')
    setCity(found)
  }
  const visibleProducts = city
    ? products.filter((p) => isInCity(p.location, city))
    : products

  return (
    <section>
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

      {error ? (
        <p className="search-error" role="alert">
          {error}
        </p>
      ) : (
        <>
          <h2>{city ? `Baby items in ${city.name}` : 'Baby items near you'}</h2>

          {city && visibleProducts.length === 0 ? (
            <p>No items found for this location</p>
          ) : (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductItemCard key={product.id} Item={product} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
export default ProductsListPage
