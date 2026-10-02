import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
        />
      </Link>

      <h3>{product.name}</h3>

      <p className="product-category">
        {product.category}
      </p>

      <p className="product-price">
        ${product.price}
      </p>

      <Link
        to={`/product/${product.id}`}
        className="view-product"
      >
        View Product
      </Link>
    </div>
  );
}

export default ProductCard;