<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="/">The Mobile Hour</a>
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
          <a class="nav-link active" aria-current="page" href="/shopAll"
            >Shop All</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/login">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Cart</a>
        </li>

        <li v-if="isAdmin" class="nav-item">
          <a class="nav-link" href="/admin/dashboard">Admin Dashboard</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isAdmin: false,
    };
  },
  created() {
    this.checkUserRole();
  },
  methods: {
    async checkUserRole() {
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
            this.isAdmin = data.role === "Admin" || data.role === "Manager";
          }
        } catch (error) {
          console.error("Error verifying token:", error);
        }
      }
    },
  },
};
</script>

<style>
.navbar-toggler {
  border-color: white !important;
  background-color: white !important;
  margin-right: 2rem;
}
.collapse {
  background-color: #ff5a5f;
  padding: 0;
  margin: 0;
}
.navbar {
  width: 100%;
  height: 18vh;

  background-color: #ff5a5f;
  position: fixed !important;
  z-index: 3;
}

.navbar-brand {
  font-size: 2rem !important;

  padding-left: 3rem;
  color: #f5f5f5 !important;
}

.nav-link {
  font-size: 1.5rem !important;
  color: #f5f5f5 !important;
  padding: 2rem;
}
.nav-item {
  padding-left: 2rem;
  padding-right: 2rem;
}
@media (min-width: 1500px) {
  .navbar {
    height: 13vh;
  }
}
</style>
