<template>
  <h1 class="heading">Our Most Popular</h1>
  <main>
    <div class="col">
      <div class="row">
        <div
          class="col-md-4 mb-4"
          v-for="product in products"
          :key="product.product_id"
        >
          <div class="card h-100">
            <div class="card-body">
              <span class="card-title">
                {{ product.manufacturer + " " + product.product_name }}
              </span>
              <p class="card-text">${{ product.price }}</p>
              <img
                :src="product.photo_url"
                alt="Product Photo"
                style="max-width: 100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/most-popular"
        );
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
};
</script>

<style></style>
