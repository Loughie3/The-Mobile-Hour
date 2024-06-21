<template>
  <div>
    <!-- Filter section -->
    <div class="row">
      <div class="col-md-2">
        <aside>FILTER SECTION</aside>
      </div>

      <!-- Product cards -->
      <div class="col">
        <div class="row">
          <div
            class="col-md-4 mb-4 col-sm-6"
            v-for="product in products"
            :key="product.product_id"
          >
            <div class="card h-100">
              <div class="card-body">
                <img
                  :src="product.photo_url"
                  alt="Product Photo"
                  style="max-width: 100%"
                />
                <h5 class="card-title">{{ product.product_name }}</h5>
                <p class="card-text">${{ product.price }}</p>

                <button href="#" type="btn" class="btn">Buy</button>
              </div>
            </div>
          </div>
        </div>
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
  },
};
</script>

<style></style>
