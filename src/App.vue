<template>
  <NavBar ref="navbar" />

  <router-view @login-success="updateNavBar" />

  <FooterSection />
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FooterSection from "./components/FooterSection.vue";

export default {
  components: { NavBar, FooterSection },
  methods: {
    updateNavBar() {
      this.$refs.navbar.checkUserRole();
    },
  },
};
</script>
