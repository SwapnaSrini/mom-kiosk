import { useEffect, useState, type SubmitEvent } from 'react'
import ProductItemCard from '../../components/ProductItemCard'
import { fetchProducts } from '../../api/products'
import type { Product } from '../../models/Product'
import { findCity, isInCity, type City } from '../../data/cities'
import './ProductsList.css'

function ProductsListPage() {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState<City | null>(null)
  const [error, setError] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchProducts(controller.signal)
      .then(setProducts)
      .catch(() => {
        if (!controller.signal.aborted)
          setLoadError("Couldn't load items. Is the server running?")
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort() // cancel if the user leaves the page
  }, [])

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
      {loading ? (
        <p>Loading items…</p>
      ) : loadError ? (
        <p className="search-error" role="alert">
          {loadError}
        </p>
      ) : error ? (
        <p className="search-error" role="alert">
          {error}
        </p>
      ) : (
        <>
          <h2>
            {city
              ? `Items in ${city.name}${city.parent ? `, ${city.parent}` : ''}`
              : 'Items near you'}
          </h2>

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
