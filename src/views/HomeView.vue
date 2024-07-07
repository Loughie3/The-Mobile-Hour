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
              <img
                :src="product.photo_url"
                alt="Product Photo"
                style="max-width: 100%"
              />
              <h5 class="card-title">
                {{ product.manufacturer + " " + product.product_name }}
                <p class="card-text">{{ product.STORAGE + "gb" }}</p>
              </h5>

              <button
                @click="navigateTo('/individualItem')"
                type="btn"
                class="btn"
              >
                Buy
              </button>
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
    navigateTo(route) {
      this.$router.push(route);
    },
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

<style scoped>
.card img {
  padding: 2rem;
}
</style>
