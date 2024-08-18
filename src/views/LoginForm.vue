<template>
  <div class="page-container">
    <main class="content-wrap">
      <h1 class="heading">Login</h1>
      <div class="row">
        <div class="col"></div>
        <div class="col-12 col-md-4">
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="username" class="form-label" required>Username</label>
              <input
                v-model="username"
                type="text"
                class="form-control"
                id="username"
                minlength="5"
                maxlength="20"
                pattern="^[a-zA-Z0-9]+$"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label" required>Password</label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                id="password"
                minlength="6"
                maxlength="20"
              />
            </div>
            <button type="submit" class="btn">Login</button>
          </form>
        </div>
        <div class="col"></div>
      </div>
    </main>
  </div>
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
        const { token, role } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user_role", role); // Store the role in localStorage

        this.$emit("login-success"); // Emit an event on successful login
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
html,
body {
  height: 100%;
  margin: 0;
}

label {
  padding: 1rem;
  font-size: 1.2rem;
}
input {
  border-color: #ff5a5f;
}

button {
  margin-top: 2rem;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrap {
  flex: 1;
}
</style>
