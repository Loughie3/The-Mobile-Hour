<template>
  <h1 class="heading">Shop All Categories</h1>
  <main>
    <div class="col">
      <div class="row">
        <div
          class="col-md-6 mb-4"
          v-for="product in products"
          :key="product.product_id"
        >
          <div class="card h-100">
            <div class="card-body">
              <h2>{{ product.manufacturer }}</h2>
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
  name: "CategoriesView",
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
          "http://localhost:3000/api/specific-products"
        );
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
};
</script>

<style scoped>
.card {
  padding: 2rem;
  margin: 2rem;
}
img {
  width: 50%; /* Half the original width */
  height: auto; /* Adjust height to maintain aspect ratio */
}
</style>
