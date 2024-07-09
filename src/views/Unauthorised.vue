<template>
  <div class="unauthorized-container">
    <h1 class="title">Access Denied</h1>
    <p class="message">You do not have permission to view this page.</p>
    <router-link to="/" class="home-link">Return to Home</router-link>
  </div>
</template>

<script>
export default {
  name: "Unauthorised",
};
</script>

<style scoped>
.unauthorized-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  text-align: center;
}

.title {
  font-size: 2em;
  color: #dc3545;
  margin-bottom: 1em;
}

.message {
  font-size: 1.2em;
  color: #6c757d;
  margin-bottom: 1.5em;
}

.home-link {
  font-size: 1em;
  color: #007bff;
  text-decoration: none;
}

.home-link:hover {
  text-decoration: underline;
}
</style>
