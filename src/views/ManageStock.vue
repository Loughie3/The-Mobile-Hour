<template>
  <div>
    <h1 class="heading">View all Stock</h1>

    <div class="row">
      <div class="col">
        <main>
          <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/admin/dashboard">Admin Dashboard</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Manage Stock
              </li>
            </ol>
          </nav>
          <div class="container">
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Stock on Hand</th>
                  <th>Update Product</th>
                  <th>Delete Product</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="data"
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
            <div
              v-if="showModal"
              class="modal fade show d-flex align-items-center justify-content-center"
              tabindex="-1"
              style="display: block"
              aria-modal="true"
              role="dialog"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-body">
                    <p>The product has been successfully updated.</p>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="closeModal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <aside>
          <h2>Add New Items</h2>
          <div class="container bottom-container">
            <form @submit.prevent="addProduct">
              <table class="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Stock on Hand</th>
                    <th>Image</th>
                    <th>Feature Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input v-model="newProduct.product_name" /></td>
                    <td><input v-model="newProduct.manufacturer" /></td>
                    <td><input v-model="newProduct.price" /></td>
                    <td><input v-model="newProduct.stock_on_hand" /></td>
                    <td><input type="file" @change="handleFileUpload" /></td>
                    <td>
                      <!-- Feature inputs -->
                      <div>
                        <input
                          v-model="newProduct.features.weight"
                          placeholder="Weight"
                        />
                        <input
                          v-model="newProduct.features.dimensions"
                          placeholder="Dimensions"
                        />
                        <input
                          v-model="newProduct.features.OS"
                          placeholder="OS"
                        />
                        <input
                          v-model="newProduct.features.screensize"
                          placeholder="Screen Size"
                        />
                        <input
                          v-model="newProduct.features.resolution"
                          placeholder="Resolution"
                        />
                        <input
                          v-model="newProduct.features.CPU"
                          placeholder="CPU"
                        />
                        <input
                          v-model="newProduct.features.RAM"
                          placeholder="RAM"
                        />
                        <input
                          v-model="newProduct.features.STORAGE"
                          placeholder="Storage"
                        />
                        <input
                          v-model="newProduct.features.battery"
                          placeholder="Battery"
                        />
                        <input
                          v-model="newProduct.features.rear_camera"
                          placeholder="Rear Camera"
                        />
                        <input
                          v-model="newProduct.features.front_camera"
                          placeholder="Front Camera"
                        />
                      </div>
                    </td>
                    <td>
                      <button class="addButton" type="submit">Add</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
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
        product_model: "", // Added product_model
        manufacturer: "",
        price: 0,
        stock_on_hand: 0,
        image: null,
        features: {
          weight: "",
          dimensions: "",
          OS: "",
          screensize: "",
          resolution: "",
          CPU: "",
          RAM: "",
          STORAGE: "",
          battery: "",
          rear_camera: "",
          front_camera: "",
        },
      },
      showModal: false,
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
      const formData = new FormData();
      formData.append("product_name", this.newProduct.product_name);
      formData.append("product_model", this.newProduct.product_model);
      formData.append("manufacturer", this.newProduct.manufacturer);
      formData.append("price", this.newProduct.price);
      formData.append("stock_on_hand", this.newProduct.stock_on_hand);
      if (this.newProduct.image) {
        formData.append("image", this.newProduct.image);
      }
      // Append features as individual form data
      Object.keys(this.newProduct.features).forEach((key) => {
        formData.append(`features[${key}]`, this.newProduct.features[key]);
      });

      try {
        const response = await axios.post(
          "http://localhost:3000/api/products",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        this.products.push(response.data);
        this.resetNewProduct();
      } catch (error) {
        console.error(
          "Error adding product:",
          error.response?.data || error.message
        );
      }
    },
    resetNewProduct() {
      this.newProduct = {
        product_name: "",
        product_model: "", // Added product_model
        manufacturer: "",
        price: 0,
        stock_on_hand: 0,
        image: null,
        features: {
          weight: "",
          dimensions: "",
          OS: "",
          screensize: "",
          resolution: "",
          CPU: "",
          RAM: "",
          STORAGE: "",
          battery: "",
          rear_camera: "",
          front_camera: "",
        },
      };
    },
    handleFileUpload(event) {
      this.newProduct.image = event.target.files[0];
    },
    async updateProduct(product) {
      try {
        await axios.put(
          `http://localhost:3000/api/products/${product.product_id}`,
          product
        );
        this.showModal = true;
      } catch (error) {
        console.error(
          "Error updating product:",
          error.response?.data || error.message
        );
      }
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${productId}`);
        this.products = this.products.filter(
          (product) => product.product_id !== productId
        );
      } catch (error) {
        console.error(
          "Error deleting product:",
          error.response?.data || error.message
        );
      }
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style>
/* Add any necessary styles here */
</style>
