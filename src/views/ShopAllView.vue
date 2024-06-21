<template>
  <h1 class="heading">Shop All Phones</h1>
  <main>
    <Products />
  </main>
  <div class="row"></div>
</template>
<script>
import Products from "../components/Products.vue";
export default {
  components: { Products },
  name: "ShopAllView",
};
</script>
