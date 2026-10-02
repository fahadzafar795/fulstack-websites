import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  function updateCartCount() {
    const cart = JSON.parse(
      localStorage.getItem("shopCart") || "[]"
    );

    const count = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCartCount(count);
  }

  function loadUser() {
    const savedUser = localStorage.getItem("shopUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    updateCartCount();
    loadUser();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("userUpdated", loadUser);

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );

      window.removeEventListener(
        "userUpdated",
        loadUser
      );
    };
  }, []);

  function logout() {
    localStorage.removeItem("shopUser");

    setUser(null);

    window.dispatchEvent(new Event("userUpdated"));

    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        SHOP.CO
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>

        <Link to="/cart">
          Cart {cartCount > 0 && `(${cartCount})`}
        </Link>

        {user ? (
          <>
            <span className="user-name">
              Hi, {user.name}
            </span>

            <button
              className="logout-button"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;