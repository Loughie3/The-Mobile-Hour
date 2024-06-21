<template>
  <NavBar></NavBar>
  <SecondaryNav></SecondaryNav>

  <router-view />
  <FooterSection></FooterSection>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import SecondaryNav from "./components/SecondaryNav.vue";
import FooterSection from "./components/FooterSection.vue";

export default {
  components: { NavBar, FooterSection, SecondaryNav },
};
</script>
