import type { Product } from "../models/Product"
import "./ProductItemCard.css"
import { Link } from "react-router-dom"

type ProductProps = {
   Item: Product
}
function ProductItemCard({ Item } : ProductProps ) {
  return (
<Link className="productitem-card-link" to={`/giveaways/${Item.id}`}>

<article className="productitem-card">
  
      <img className="productitem-image"
        src={Item.imageUrl}
        alt={Item.title}
      />

      <h3 className="productitem-card-title">{Item.title}</h3>

      <p className="productitem-card-description">{Item.description}</p>

      <p className="productitem-card-condition">{Item.condition}</p>

      <p className="productitem-card-location">📍 {Item.location}</p>
    </article>
    </Link>
  )
}

export default ProductItemCard
