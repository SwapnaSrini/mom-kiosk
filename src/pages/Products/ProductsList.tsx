import { useEffect, useState } from 'react'
import ProductItemCard from '../../components/ProductItemCard'
import { fetchProducts } from '../../api/products'
import type { Product } from '../../models/Product'
import {
  cityLabel,
  filterByLocation,
  type LocationFilter,
} from '../../data/cities'
import './ProductsList.css'

function ProductsListPage({
  locationFilter,
}: {
  locationFilter: LocationFilter
}) {
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

  const visibleProducts = filterByLocation(
    products,
    locationFilter,
    (p) => p.location,
  )

  return (
    <section>
      {loading ? (
        <p>Loading items…</p>
      ) : loadError ? (
        <p className="search-error" role="alert">
          {loadError}
        </p>
      ) : locationFilter.kind === 'invalid' ? null : (
        <>
          <h2>
            {locationFilter.kind === 'city'
              ? `Baby items in ${cityLabel(locationFilter.city)}`
              : 'Baby items near you'}
          </h2>
          {locationFilter.kind === 'city' && visibleProducts.length === 0 ? (
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
