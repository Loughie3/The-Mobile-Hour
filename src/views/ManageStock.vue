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

          <!-- Manage Stock Section -->
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
                  <button class="updateButton" @click="updateProduct(product)">
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

          <!-- Add New Items Section -->
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input v-model="newProduct.product_name" />
                      </td>
                      <td>
                        <input v-model="newProduct.manufacturer" />
                      </td>
                      <td><input v-model="newProduct.price" /></td>
                      <td>
                        <input v-model="newProduct.stock_on_hand" />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <!-- Add Feature Details Section -->
                <aside>
                  <h2>Feature Details</h2>
                  <div class="container">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Weight</th>
                          <th>Dimensions</th>
                          <th>OS</th>
                          <th>Screen Size</th>
                          <th>Resolution</th>
                          <th>Battery</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              v-model="newProduct.features.weight"
                              placeholder="Weight"
                            />
                          </td>
                          <td>
                            <input
                              v-model="newProduct.features.dimensions"
                              placeholder="Dimensions"
                            />
                          </td>
                          <td>
                            <input
                              v-model="newProduct.features.OS"
                              placeholder="OS"
                            />
                          </td>
                          <td>
                            <input
                              v-model="newProduct.features.screensize"
                              placeholder="Screen Size"
                            />
                          </td>
                          <td>
                            <input
                              v-model="newProduct.features.resolution"
                              placeholder="Resolution"
                            />
                          </td>
                          <td>
                            <input
                              v-model="newProduct.features.battery"
                              placeholder="Battery"
                            />
                          </td>
                        </tr>
                      </tbody>
                      <thead>
                        <tr>
                          <th>CPU</th>
                          <th>RAM</th>
                          <th>Storage</th>
                          <th>Front Camera</th>
                          <th>Rear Camera</th>
                          <th>Image</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              v-model="newProduct.features.CPU"
                              placeholder="CPU"
                            />
                          </td>
                          <td>
                            <input
                              v-model="newProduct.features.RAM"
                              placeholder="RAM"
                            />
                          </td>
                          <td>
                            <input
                              v-model="newProduct.features.STORAGE"
                              placeholder="Storage"
                            />
                          </td>
                          <td>
                            <input
                              v-model="newProduct.features.front_camera"
                              placeholder="Front Camera"
                            />
                          </td>
                          <td>
                            <input
                              v-model="newProduct.features.rear_camera"
                              placeholder="Rear Camera"
                            />
                          </td>
                          <td>
                            <input type="file" @change="handleFileUpload" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </aside>

                <!-- Centered Add Button -->
                <div class="text-center my-4">
                  <button class="btn btn-primary" type="submit">Add</button>
                </div>
              </form>
            </div>
          </aside>
        </main>
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
      if (
        !this.newProduct.features.weight ||
        !this.newProduct.features.dimensions ||
        !this.newProduct.features.OS ||
        !this.newProduct.features.screensize ||
        !this.newProduct.features.resolution ||
        !this.newProduct.features.CPU ||
        !this.newProduct.features.RAM ||
        !this.newProduct.features.STORAGE ||
        !this.newProduct.features.battery ||
        !this.newProduct.features.rear_camera ||
        !this.newProduct.features.front_camera
      ) {
        alert("Please fill in all feature fields.");
        return;
      }

      const formData = new FormData();
      formData.append("product_name", this.newProduct.product_name);
      formData.append("product_model", this.newProduct.product_model);
      formData.append("manufacturer", this.newProduct.manufacturer);
      formData.append("price", this.newProduct.price);
      formData.append("stock_on_hand", this.newProduct.stock_on_hand);
      if (this.newProduct.image) {
        formData.append("image", this.newProduct.image);
      }
      formData.append("features", JSON.stringify(this.newProduct.features));

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

<style scoped>
.btn {
  width: 20%;
}

h2 {
  margin-top: 4rem;
}
</style>
