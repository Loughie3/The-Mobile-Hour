<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="#">The Mobile Hour</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Login">Profile</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Cart</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
.navbar-toggler {
  border-color: white !important;
  background-color: white !important;
  margin-right: 2rem;
}
.collapse {
  background-color: #3c3c3c;
  padding: 0;
  margin: 0;
}
.navbar {
  height: 15vh; /* Increase the height */
  padding: 20px; /* Adjust padding for more space */
  background-color: #3c3c3c;
}

.navbar-brand {
  font-size: 2rem !important; /* Increase font size for the brand */
  padding: 2rem;
  color: #f5f5f5 !important;
}

.nav-link {
  font-size: 1.5rem !important; /* Increase font size for the links */
  color: #f5f5f5 !important;
  padding: 2rem;
}
.nav-item {
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>
