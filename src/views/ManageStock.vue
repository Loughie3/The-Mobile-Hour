<template>
  <div>
    <h1 class="heading">View all Stock</h1>
    <div class="row">
      <div class="col">
        <main>
          <div class="container">
            <table class="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Brand</th>
                  <th>Price</th>

                  <th>Stock on Hand</th>
                  <th>Update Product</th>
                  <th>Delete Product</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="stock"
                  v-for="product in products"
                  :key="product.product_id"
                >
                  <td><input v-model="product.product_name" /></td>
                  <td><input v-model="product.manufacturer" /></td>
                  <td><input v-model="product.price" /></td>
                  <td><input v-model="product.stock_on_hand" /></td>
                  <td>
                    <button
                      class="updateButton"
                      @click="updateProduct(product)"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button @click="deleteProduct(product.product_id)">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
        <aside>
          <h2 class="heading">Add New Items</h2>
          <div class="container">
            <table class="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Stock on Hand</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input v-model="newProduct.product_name" /></td>
                  <td><input v-model="newProduct.manufacturer" /></td>
                  <td><input v-model="newProduct.price" /></td>
                  <td><input v-model="newProduct.stock_on_hand" /></td>
                  <td>
                    <button class="addButton" @click="addProduct">Add</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      newProduct: {
        product_name: "",
        manufacturer: "",
        price: 0,
        stock_on_hand: 0,
      },
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async addProduct() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/products",
          this.newProduct
        );
        this.products.push(response.data);
        this.newProduct = {
          product_name: "",
          manufacturer: "",
          price: 0,
          stock_on_hand: 0,
        };
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
    async updateProduct(product) {
      try {
        await axios.put(
          `http://localhost:3000/api/products/${product.product_id}`,
          product
        );
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${productId}`);
        this.products = this.products.filter(
          (product) => product.product_id !== productId
        );
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
  },
};
</script>

<style scoped>
.table th {
  color: #087e8b;
  font-size: 1.2rem;
}
.table .updateButton {
  color: green;
}
.table .addButton {
  color: #087e8b;
}

.table button {
  color: #ff5a5f;
  border-style: none;
  background-color: white;
}
input {
  border-color: #087e8b;
}
.stock input {
  border-style: none;
}
</style>
