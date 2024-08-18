<template>
  <div>
    <div class="heading-container">
      <h1 class="heading">Change Log</h1>
    </div>

    <div class="row">
      <div class="col">
        <main>
          <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/admin/dashboard">Admin Dashboard</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Change Log
              </li>
            </ol>
          </nav>
          <div class="container">
            <table class="table">
              <thead>
                <tr>
                  <th>Date Created</th>
                  <th>Last Modified</th>
                  <th>User ID</th>
                  <th>Product ID</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="data"
                  v-for="changelog in changelogs"
                  :key="changelog.changelog_id"
                >
                  <td>{{ formatDate(changelog.date_created) }}</td>
                  <td>{{ formatDate(changelog.date_last_modified) }}</td>
                  <td>{{ changelog.user_id }}</td>
                  <td>{{ changelog.product_id }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      changelogs: [],
    };
  },
  created() {
    this.fetchChangelogs();
    // Set up an interval to fetch new changelogs every 10 seconds
    this.changelogInterval = setInterval(this.fetchChangelogs, 10000);
  },
  beforeDestroy() {
    // Clear the interval when the component is destroyed
    clearInterval(this.changelogInterval);
  },
  methods: {
    async fetchChangelogs() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/changelogs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.changelogs = response.data;
      } catch (error) {
        console.error("Error fetching changelogs:", error);
      }
    },
    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>
<style scoped>
.heading {
  margin: 0;
}

.breadcrumb-container {
  margin: 0;
}
</style>
