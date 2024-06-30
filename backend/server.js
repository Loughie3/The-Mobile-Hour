// server.js
const express = require("express");
const cors = require("cors");
const path = require("path"); // Import the path module
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("./connection"); // Import the connection

const app = express();
const port = 3000;
const secretKey = "JJJ";

app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Use CORS to allow requests from your Vue app
app.use(express.static(path.join(__dirname, "../public")));

// Fetch all products with feature storage from the database
app.get("/api/products", (req, res) => {
  const query = `
    SELECT p.*, f.STORAGE
    FROM the_mobile_hour.product p
    LEFT JOIN the_mobile_hour.feature f ON p.feature_id = f.feature_id`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Server error");
      return;
    }
    res.json(results);
  });
});

app.post("/api/products", (req, res) => {
  const { product_name, manufacturer, price, stock_on_hand } = req.body;
  const query = `INSERT INTO product (product_name, manufacturer, price, stock_on_hand) VALUES (?, ?, ?, ?)`;

  connection.query(
    query,
    [product_name, manufacturer, price, stock_on_hand],
    (err, result) => {
      if (err) {
        console.error("Error adding product:", err);
        res.status(500).send("Server error");
        return;
      }
      res.json({ product_id: result.insertId, ...req.body });
    }
  );
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { product_name, manufacturer, price, stock_on_hand } = req.body;
  const query = `UPDATE product SET product_name = ?, manufacturer = ?, price = ?, stock_on_hand = ? WHERE product_id = ?`;

  connection.query(
    query,
    [product_name, manufacturer, price, stock_on_hand, id],
    (err, result) => {
      if (err) {
        console.error("Error updating product:", err);
        res.status(500).send("Server error");
        return;
      }
      res.sendStatus(204); // No Content
    }
  );
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM product WHERE product_id = ?`;

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting product:", err);
      res.status(500).send("Server error");
      return;
    }
    res.sendStatus(204); // No Content
  });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM user WHERE username = ?`;
  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Server error");
      return;
    }

    if (results.length === 0) {
      res.status(401).send("Invalid credentials");
      return;
    }

    const user = results[0];
    console.log("User found:", user);

    bcrypt.compare(password, user.user_password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        res.status(500).send("Server error");
        return;
      }

      console.log("Password comparison result:", isMatch);

      if (!isMatch) {
        res.status(401).send("Invalid credentials");
        return;
      }

      const token = jwt.sign(
        { userId: user.user_id, role: user.user_role },
        secretKey,
        { expiresIn: "1h" }
      );

      res.json({ token });
    });
  });
});

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

// Admin-only route example
app.get("/api/admin/dashboard", authenticateJWT, (req, res) => {
  if (req.user.role !== "Admin") {
    return res.sendStatus(403);
  }

  res.json({ message: "Welcome to the admin dashboard!" });
});

// API Request to grab specific different categories with feature storage
app.get("/api/specific-products", (req, res) => {
  const specificProducts = [1, 6, 11, 18];

  const query = `
    SELECT p.*, f.STORAGE
    FROM the_mobile_hour.product p
    LEFT JOIN the_mobile_hour.feature f ON p.feature_id = f.feature_id
    WHERE p.product_id IN (${specificProducts.join(",")})`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Server error");
      return;
    }
    res.json(results);
  });
});

app.get("/api/most-popular", (req, res) => {
  const mostPopular = [1, 3, 6, 8, 11, 18];

  const query = `
    SELECT p.*, f.STORAGE
    FROM the_mobile_hour.product p
    LEFT JOIN the_mobile_hour.feature f ON p.feature_id = f.feature_id
    WHERE p.product_id IN (${mostPopular.join(",")})`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Server error");
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
