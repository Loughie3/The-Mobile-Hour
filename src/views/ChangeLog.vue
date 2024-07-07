<template>
  <div>
    <h1 class="heading">Change Log</h1>
    <div class="row">
      <div class="col">
        <main>
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
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/changelogs"
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
