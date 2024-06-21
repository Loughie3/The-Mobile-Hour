<template>
  <div class="row">
    <div class="col"></div>
    <div class="col-12 col-md-4">
      <h1 class="heading">Login</h1>
      <form class="container-fluid">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">First Name</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="LastName"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" class="btn">Sign Up</button>
      </form>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
};
</script>

<style></style>
