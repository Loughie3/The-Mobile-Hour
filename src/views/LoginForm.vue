<template>
  <div class="page-container">
    <main class="content-wrap">
      <h1 class="heading">Login</h1>
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
html,
body {
  height: 100%;
  margin: 0;
}
.heading {
  margin-bottom: 3rem;
}

label {
  padding: 1rem;
  font-size: 1.2rem;
}
.or {
  margin-bottom: 2rem;
}
button {
  margin: 2rem;
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
