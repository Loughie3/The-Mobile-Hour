<template>
  <main>
    <div class="row">
      <div class="col-lg-12">
        <h1 class="heading">Welcome back, {{ user.username }}</h1>
        <div class="button-group">
          <div class="button-item">
            <a href="/admin/dashboard/manageStock" class="btn">
              Manage Stock
            </a>
          </div>
          <div class="button-item">
            <button class="btn">Manage Users</button>
          </div>
          <div class="button-item">
            <button class="btn">View Change Log</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "AdminDashboard",
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    // Call fetchUser() method if needed
  },
};
</script>

<style scoped>
.button-group {
  display: flex;
  flex-direction: column;
  align-items: center; /* Align buttons horizontally centered */
}

.button-item {
  margin-bottom: 3rem; /* Adjust spacing between buttons */
  width: 70%;
}

button {
  padding: 1rem;
  width: 100%; /* Ensure button expands to full width of its container */
  text-align: center; /* Center button text */
}
.heading {
  margin-bottom: 2rem;
}
</style>
