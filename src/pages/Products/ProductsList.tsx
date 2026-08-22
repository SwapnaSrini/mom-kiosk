import ProductItemCard from "../../components/ProductItemCard";
import { products } from "../../data/ProductData";


function ProductsListPage() {
    return (
         <section>
      <h2>Available baby items near you</h2>

      <div className="giveaway-grid">
      {products.map((product) => (
        <ProductItemCard
        Item={product}
        />
      ))}
      </div>
      </section>
    )
}
export default ProductsListPage