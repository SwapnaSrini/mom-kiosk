import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProduct } from '../../api/products'
import type { Product } from '../../models/Product'
import ProductImageCarousel from '../../components/ProductImageCarousel'
import InterestPanel from '../../components/InterestPanel'
import './ProductsDetails.css'

function ProductDetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [status, setStatus] = useState<
    'loading' | 'ready' | 'not-found' | 'error'
  >('loading')

  useEffect(() => {
    if (!id) return
    const controller = new AbortController()
    fetchProduct(id, controller.signal)
      .then((p) => {
        setProduct(p)
        setStatus('ready')
      })
      .catch((err: Error) => {
        if (controller.signal.aborted) return
        setStatus(err.message === 'not-found' ? 'not-found' : 'error')
      })
    return () => controller.abort()
  }, [id])

  if (status === 'loading') return <p>Loading…</p>
  if (status === 'not-found') return <h1>This item doesn't exist (anymore).</h1>
  if (status === 'error' || !product)
    return <h1>Couldn't load this item. Try again later.</h1>

  return (
    <main className="product-details">
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

      <div className="product-details-layout">
        <section className="product-gallery">
          <div className="product-details-image">
            <ProductImageCarousel
              imageUrls={product.imageUrls}
              productName={product.name}
            />
          </div>
        </section>

        <section className="product-info">
          <div className="products-details-info">
            <h1>{product.name}</h1>

            <p className="product-description">{product.description}</p>

            <p className="product-condition">{product.condition}</p>

            <p className="product-location">📍 {product.location}</p>

            <p className="product-price">Free</p>

            <p className="product-seller">Given away by {product.sellerName}</p>

            <InterestPanel key={product.id} product={product} />
          </div>
        </section>
      </div>
    </main>
  )
}

export default ProductDetailsPage
