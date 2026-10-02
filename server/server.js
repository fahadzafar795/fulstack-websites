const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const productsPath = path.join(
  __dirname,
  "data",
  "products.json"
);

const usersPath = path.join(
  __dirname,
  "data",
  "users.json"
);

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeJSON(filePath, data) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2)
  );
}

/* PRODUCTS */

app.get("/api/products", (req, res) => {
  const products = readJSON(productsPath);
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const products = readJSON(productsPath);

  const product = products.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
});

/* REGISTER */

app.post("/api/users/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const users = readJSON(usersPath);

  const existingUser = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    return res.status(409).json({
      message: "User already exists"
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password
  };

  users.push(newUser);
  writeJSON(usersPath, users);

  res.status(201).json({
    message: "Registration successful",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  });
});

/* LOGIN */

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  const users = readJSON(usersPath);

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

/* SERVER */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});