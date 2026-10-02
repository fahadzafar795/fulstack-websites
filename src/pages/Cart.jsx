import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  function loadCart() {
    const savedCart = JSON.parse(
      localStorage.getItem("shopCart") || "[]"
    );

    setCart(savedCart);
  }

  function updateQuantity(id, amount) {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + amount),
            }
          : item
      );

    setCart(updatedCart);

    localStorage.setItem(
      "shopCart",
      JSON.stringify(updatedCart)
    );
  }

  function removeItem(id) {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "shopCart",
      JSON.stringify(updatedCart)
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <h1>Your Cart</h1>

        <div className="cart-empty">
          <h2>Your cart is empty</h2>

          <p>
            You haven't added any products to your cart yet.
          </p>

          <Link to="/shop" className="shop-button">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
           
           <div className="cart-product-info">
  <img
    src={item.image}
    alt={item.name}
    className="cart-product-image"
  />

  <div>
    <h2>{item.name}</h2>
    <p>{item.category}</p>
    <strong>${item.price}</strong>
  </div>
</div>

            <div>
              <button
                onClick={() => updateQuantity(item.id, -1)}
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => updateQuantity(item.id, 1)}
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h2>Total: ${total}</h2>

        <Link to="/checkout" className="shop-button">
          Go to Checkout
        </Link>
      </div>
    </section>
  );
}

export default Cart;