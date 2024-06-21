// server.js
const express = require("express");
const cors = require("cors");
const path = require("path"); // Import the path module
const connection = require("./connection"); // Import the connection

const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());

// Use CORS to allow requests from your Vue app
app.use(express.static(path.join(__dirname, "../public")));

// Define a route to fetch data from the database
app.get("/api/products", (req, res) => {
  const query = "SELECT * FROM the_mobile_hour.product";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Server error");
      return;
    }
    res.json(results);
  });
});

app.get("/api/specific-products", (req, res) => {
  const specificProducts = [1, 6, 11, 18];

  const query = `SELECT * FROM the_mobile_hour.product WHERE product_id IN (${specificProducts.join(
    ","
  )})`;

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
