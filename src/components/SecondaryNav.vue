<template>
  <nav class="navbar-light SecondaryNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/shopAll"
          >Shop All</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/categories">Categories</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "SecondaryNav",
};
</script>

<style scoped>
.SecondaryNav {
  background-color: #ff5a5f;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align items to the left */
  padding-left: 1rem;
}

.navbar-nav {
  display: flex;
  flex-direction: row; /* Ensure horizontal alignment */

  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0 1rem; /* Space between items */
}

.nav-link {
  color: white;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
