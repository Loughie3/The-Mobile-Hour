<template>
  <div class="product-container">
    <h1 class="heading">
      {{ product.manufacturer + " " + product.product_name }}
    </h1>
    <main>
      <div class="row" v-if="product">
        <div class="col-md-6 image-container">
          <img
            :src="product.photo_url"
            alt="Product Image"
            class="product-image"
          />
        </div>
        <div class="col-md-6">
          <div class="product-details">
            <p>Model: {{ product.product_model }}</p>
            <p>Manufacturer: {{ product.manufacturer }}</p>
            <p>Price: ${{ product.price }}</p>
            <p>Storage: {{ product.STORAGE }} GB</p>
            <button class="btn">Buy Now</button>
          </div>
        </div>
      </div>
      <div v-else class="loading">
        <p>Loading product details...</p>
      </div>
    </main>

    <div class="col-md-12">
      <aside class="product-specs">
        <h1 class="specs">Product Specs:</h1>
        <p>Weight: {{ product.weight }} grams</p>
        <p>Dimensions: {{ product.dimensions }} cm</p>
        <p>OS: {{ product.OS }}</p>
        <p>Screen Size: {{ product.screensize }} inches</p>
        <p>Resolution: {{ product.resolution }}</p>
        <p>CPU: {{ product.CPU }}</p>
        <p>RAM: {{ product.RAM }} GB</p>
        <p>Battery: {{ product.battery }}</p>
        <p>Rear Camera: {{ product.rear_camera }}</p>
        <p>Front Camera: {{ product.front_camera }}</p>
      </aside>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: 0,
    };
  },
  async created() {
    await this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      try {
        const productId = 2; // The ID of the product you want to fetch
        console.log(`Fetching product with ID: ${productId}`);
        const response = await axios.get(
          `http://localhost:3000/api/products/${productId}`
        );
        console.log("Response data:", response.data);
        this.product = response.data;
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    },
  },
};
</script>

<style scoped>
.product-container {
  padding: 20px;
}

.specs {
  font-size: 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  text-align: center;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-details {
  text-align: left;
  font-size: 1.5rem;
  line-height: 2;
}
.product-details h2 {
  margin-bottom: 1rem;
  margin-top: 0.5rem;
}
.product-name {
  font-size: 2rem;
  margin-bottom: 10px;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
}

.product-specs {
  margin-top: 20px;
  padding: 20px;
  border: 2px solid #087e8b;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.product-specs h3 {
  font-size: 1.5rem;
}

.product-specs p {
  margin-bottom: 8px;
  font-size: 1.2rem;
  line-height: 2;
}
.btn {
  width: 30%;
}
</style>
