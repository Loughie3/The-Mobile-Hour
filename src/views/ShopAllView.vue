<template>
  <div>
    <h1 class="heading">Shop All Phones</h1>
    <div class="row">
      <div class="col-md-2">
        <aside>
          <FilterSection
            @filter-by-manufacturer="filterProductsByManufacturer"
            @filter-by-price="filterProductsByPrice"
          />
        </aside>
      </div>

      <div class="col">
        <main>
          <div class="row">
            <div
              class="col-md-4 mb-4"
              v-for="product in filteredProducts"
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

                  <p class="card-text">${{ product.price }}</p>

                  <button href="#" type="btn" class="btn">Buy</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FilterSection from "../components/FilterSection.vue";

export default {
  components: { FilterSection },

  data() {
    return {
      products: [],
      filteredProducts: [],
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
        this.filteredProducts = this.products; // Initialize filteredProducts with all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    filterProductsByManufacturer({ manufacturer }) {
      this.filteredProducts = this.products.filter(
        (product) => product.manufacturer === manufacturer
      );
    },
    filterProductsByPrice({ min, max }) {
      this.filteredProducts = this.products.filter(
        (product) => product.price >= min && product.price < max
      );
    },
  },
};
</script>

<style></style>
