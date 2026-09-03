import { Link, useParams } from "react-router-dom"
import { products } from "../../data/ProductData"
import ProductImageCarousel from "../../components/ProductImageCarousel"
import "./ProductsDetails.css"

function ProductDetailsPage() {
  const { id } = useParams()

  const productId = Number(id)

const product = products.find(
  (item) => Number(item.id) === productId
)

if (!product) {
  return <h1>Product not found, try again later</h1>
}
 return (
  <main className="product-details">

    <Link to="/products" className="back-link">
      ← Back to Products
    </Link>

    <div className="products-details-layout">

      <div className="product-details-image">
       <ProductImageCarousel
          imageUrls={product.imageUrls}
          productName={product.name}
        />
      </div>

      <div className="products-details-info">

        <h1>{product.name}</h1>

        <p>{product.condition}</p>

        <p>📍 {product.location}</p>

        <p>Given away by {product.sellerName}</p>

        <button>
          I am interested
        </button>

      </div>

    </div>

  </main>
)
}

export default ProductDetailsPage