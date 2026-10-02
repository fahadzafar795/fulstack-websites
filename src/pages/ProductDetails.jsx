import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Product nahi mila.");
        setLoading(false);
      });
  }, [id]);

  function addToCart() {
    const existingCart = JSON.parse(
      localStorage.getItem("shopCart") || "[]"
    );

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        { ...product, quantity: 1 },
      ];
    }

    localStorage.setItem(
      "shopCart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    alert("Product cart mein add ho gaya!");
  }

  if (loading) {
    return <h2 className="page-message">Loading...</h2>;
  }

  if (error) {
    return <h2 className="page-message">{error}</h2>;
  }

  return (
    <section className="product-details">
     
     <div className="details-image">
  <img
    src={product.image}
    alt={product.name}
    className="details-product-image"
  />
</div>

      <div className="details-info">
        <p className="product-category">
          {product.category}
        </p>

        <h1>{product.name}</h1>

        <h2>${product.price}</h2>

        <p>
          This is a stylish {product.category.toLowerCase()}
          from the SHOP.CO collection.
        </p>

        <button
          className="add-cart-button"
          onClick={addToCart}
        >
          Add to Cart
        </button>

        <br />

        <Link to="/shop" className="back-button">
          ← Back to Shop
        </Link>
      </div>
    </section>
  );
}

export default ProductDetails;