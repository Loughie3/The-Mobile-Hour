<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-6 brand">
          <h4>The Mobile Hour</h4>
          <p>Connecting you with the latest in mobile technology</p>
        </div>
        <div class="col-md-6 links">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Profile</a></li>
            <li><a href="/">Cart</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterSection",
};
</script>

<style scoped>
footer {
  background-color: #3c3c3c;
  padding: 20px 0;
  color: white;
}

.brand h4 {
  margin: 0;
  font-size: 1.5rem;
}

.brand p {
  font-size: 0.9rem;
  color: #b0b0b0;
}

.links ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-end;
}

.links li {
  margin-left: 20px;
}

.links a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
}

.links a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .links ul {
    flex-direction: column;
    align-items: flex-start;
  }

  .links li {
    margin: 5px 0;
  }
}
</style>
