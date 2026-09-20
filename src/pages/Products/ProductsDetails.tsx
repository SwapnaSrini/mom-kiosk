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

        <button className="contact-button">
          I am interested
        </button>

      </div>


     </section>
    </div>

  </main>
)
}

export default ProductDetailsPage