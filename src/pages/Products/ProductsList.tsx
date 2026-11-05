import ProductItemCard from '../../components/ProductItemCard'
import { products } from '../../data/ProductData_new'
import './ProductsList.css'

function ProductsListPage() {
  return (
    <section>
      <h2>Available baby items near you</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductItemCard key={product.id} Item={product} />
        ))}
      </div>
    </section>
  )
}
export default ProductsListPage
