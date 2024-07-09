<template>
  <div class="page-container">
    <main class="content-wrap">
      <div class="row">
        <div class="col-lg-12">
          <h1 class="heading">Welcome back {{ userRole }}</h1>
          <div class="button-group">
            <div class="button-item">
              <button
                @click="navigateTo('/admin/dashboard/manageStock')"
                class="btn"
              >
                Manage Stock
              </button>
            </div>
            <div v-if="userRole === 'Manager'" class="button-item">
              <button
                @click="navigateTo('/admin/dashboard/managerViewUsers')"
                class="btn"
              >
                Manage Users - Manager Only
              </button>
            </div>
            <div v-if="userRole === 'Admin'" class="button-item">
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
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
  data() {
    return {
      userRole: "", // Track the user role
    };
  },
  async created() {
    // Fetch user data when the component is created
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("http://localhost:3000/api/verify", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          this.userRole = data.role; // Set the user role
        } else {
          console.error(`Error verifying token: ${response.statusText}`);
          // Redirect to login if the token verification fails
          this.$router.push("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        // Redirect to login if an error occurs
        this.$router.push("/login");
      }
    }
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
