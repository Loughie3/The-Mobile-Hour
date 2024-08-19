<template>
  <div class="filterSection container-fluid">
    <h3>Search Products</h3>
    <input
      type="text"
      placeholder="Search by product name or brand..."
      v-model="searchQuery"
      @input="searchProducts"
    />

    <h3>Filter By Price</h3>
    <ul>
      <li>
        <a @click="selectPriceRange(0, 500)">$0 - $500</a>
      </li>
      <li>
        <a @click="selectPriceRange(500, 1000)">$500 - $1000</a>
      </li>
      <li>
        <a @click="selectPriceRange(1000, 1500)">$1000 - $1500</a>
      </li>
      <li>
        <a @click="selectPriceRange(1500, 2000)">$1500 - $2000</a>
      </li>
    </ul>

    <h3>Popular Brands</h3>
    <ul>
      <li>
        <a @click="selectManufacturer('Google')">Google</a>
      </li>
      <li>
        <a @click="selectManufacturer('Apple')">Apple</a>
      </li>
      <li>
        <a @click="selectManufacturer('Samsung')">Samsung</a>
      </li>
      <li>
        <a @click="selectManufacturer('Nokia')">Nokia</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FilterSection",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    selectPriceRange(min, max) {
      this.$emit("filter-by-price", { min, max });
    },
    selectManufacturer(manufacturer) {
      this.$emit("filter-by-manufacturer", { manufacturer });
    },
    searchProducts() {
      this.$emit("filter-by-search", this.searchQuery);
    },
  },
};
</script>

<style scoped>
.filterSection {
  margin-left: 2rem;
}
h3 {
  margin-top: 2rem;
}
.filterSection ul {
  text-align: left;
  list-style-type: none;
}
li {
  padding-top: 1rem;
}
a {
  cursor: pointer;
}
input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}
</style>
