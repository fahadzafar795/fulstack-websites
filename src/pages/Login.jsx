import { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      localStorage.setItem(
        "shopUser",
        JSON.stringify(data.user)
      );

      window.dispatchEvent(new Event("userUpdated"));

      setMessage(`Welcome, ${data.user.name}!`);
    } catch (error) {
      setError("Server se connection nahi ho raha.");
    }
  }

  return (
    <section className="auth-page">
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        {message && (
          <p className="success">{message}</p>
        )}

        <button type="submit">
          Login
        </button>
      </form>
    </section>
  );
}

export default Login;