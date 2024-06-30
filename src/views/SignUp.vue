<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Login</button>
    </form>
    <p v-if="loginError" class="error">{{ loginError }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      loginError: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message);
        }

        const { user } = await response.json();
        // Handle successful login, e.g., store user info in Vuex/store, redirect to dashboard
        console.log("Logged in user:", user);
        // Example: this.$router.push("/admin-dashboard");
      } catch (error) {
        console.error("Login failed:", error.message);
        this.loginError = error.message;
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
