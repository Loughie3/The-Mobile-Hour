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

//Fetch product by ID
app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const query = `
    SELECT p.*, f.*
    FROM the_mobile_hour.product p
    LEFT JOIN the_mobile_hour.feature f ON p.feature_id = f.feature_id
    WHERE p.product_id = ?`;

  connection.query(query, [productId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Server error");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("Product not found");
      return;
    }
    res.json(results[0]);
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
      if (err.code === "ER_ROW_IS_REFERENCED_2") {
        return res
          .status(400)
          .send("Cannot delete product as it is referenced in other tables.");
      }
      res.status(500).send("Server error");
      return;
    }
    res.sendStatus(204); // No Content
  });
});

//Get All users
app.get("/api/users", (req, res) => {
  const query = `SELECT * FROM user `;
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Server error");
      return;
    }
    res.json(results);
  });
});
// Update User
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, user_role, username } = req.body;
  const query = `UPDATE user SET firstname = ?, lastname = ?, user_role = ?, username = ? WHERE user_id = ?`;

  connection.query(
    query,
    [firstname, lastname, user_role, username, id],
    (err, result) => {
      if (err) {
        console.error("Error updating user:", err);
        res.status(500).send("Server error");
        return;
      }
      res.sendStatus(204); // No Content
    }
  );
});

//Add A new User
app.post("/api/users", (req, res) => {
  const { firstname, lastname, user_role, username } = req.body;
  const query = `INSERT INTO user (firstname, lastname, user_role, username ) VALUES (?, ?, ?, ?)`;
  connection.query(
    query,
    [firstname, lastname, user_role, username],
    (err, result) => {
      if (err) {
        console.error("Error adding user:", err);
        res.status(500).send("Server error");
        return;
      }
      res.json({ user_id: result.insertId, ...req.body });
    }
  );
});

//Delete User
app.delete("/api/user/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM user WHERE user_id = ?`;

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
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
  const specificProducts = [2, 6, 11, 18];

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
  const mostPopular = [2, 3, 6, 8, 11, 18];

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

//Display the change Log
app.get("/api/admin/changelogs", (req, res) => {
  const query = `SELECT * FROM changelog`;
  connection.query(query, (error, results) => {
    if (error) {
      console.log("Error Fetching changelog", error);
      res.status(500).send("Server error");
      return;
    }
    res.json(results);
  });
});
