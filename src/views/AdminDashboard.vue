<template>
  <main>
    <div class="row">
      <div class="col-lg-12">
        <h1 class="heading">Welcome back</h1>
        <div class="button-group">
          <div class="button-item">
            <button
              @click="navigateTo('/admin/dashboard/manageStock')"
              class="btn"
            >
              Manage Stock
            </button>
          </div>
          <div class="button-item">
            <button
              @click="navigateTo('/admin/dashboard/managerViewUsers')"
              class="btn"
            >
              Manage Users - Manager
            </button>
          </div>
          <div class="button-item">
            <button
              @click="navigateTo('/admin/dashboard/viewUsers')"
              class="btn"
            >
              Manage Users
            </button>
          </div>
          <div class="button-item">
            <button
              @click="navigateTo('/admin/dashboard/changeLog')"
              class="btn"
            >
              View Change Log
            </button>
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
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
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
