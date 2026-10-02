import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("shopCart") || "[]"
    );

    setCart(savedCart);
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      localStorage.removeItem("shopCart");

      window.dispatchEvent(new Event("cartUpdated"));

      setOrderPlaced(true);
    }
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (orderPlaced) {
    return (
      <section className="checkout-page">
        <div className="order-success">
          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for shopping with SHOP.CO.
          </p>

          <Link to="/shop" className="shop-button">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="checkout-page">
        <h1>Checkout</h1>

        <div className="cart-empty">
          <h2>Your cart is empty</h2>

          <p>
            Add some products before going to checkout.
          </p>

          <Link to="/shop" className="shop-button">
            Go to Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-summary">
        <h2>Order Summary</h2>

        {cart.map((item) => (
          <div className="checkout-item" key={item.id}>
            <span>
              {item.name} × {item.quantity}
            </span>

            <strong>
              ${item.price * item.quantity}
            </strong>
          </div>
        ))}

        <h2 className="checkout-total">
          Total: ${total}
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="checkout-form"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        {errors.name && (
          <p className="error">{errors.name}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        {errors.email && (
          <p className="error">{errors.email}</p>
        )}

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        {errors.address && (
          <p className="error">{errors.address}</p>
        )}

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        {errors.city && (
          <p className="error">{errors.city}</p>
        )}

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        {errors.phone && (
          <p className="error">{errors.phone}</p>
        )}

        <button type="submit">
          Place Order
        </button>
      </form>
    </section>
  );
}

export default Checkout;