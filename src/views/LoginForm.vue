<template>
  <h1 class="heading">Login</h1>
  <main>
    <div class="row">
      <div class="col"></div>
      <div class="col-12 col-md-4">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              v-model="username"
              type="text"
              class="form-control"
              id="username"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
            />
          </div>
          <button type="submit" class="btn">Login</button>
          <div>or</div>
          <a href="/signUp">Sign Up</a>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3000/api/login", {
          username: this.username,
          password: this.password,
        });
        const { token } = response.data;
        localStorage.setItem("token", token);
        this.$router.push("/admin/dashboard");
      } catch (error) {
        console.error("Login error:", error);
        alert("Invalid credentials");
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
