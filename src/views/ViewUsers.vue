<template>
  <div class="page-container">
    <main class="content-wrap">
      <h1 class="heading">View All Users</h1>
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/admin/dashboard">Admin Dashboard</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Manage Stock
          </li>
        </ol>
      </nav>
      <div class="row">
        <div class="col">
          <div class="container">
            <table class="table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                  <th>User Name</th>
                  <th>Edit User</th>
                  <th>Delete User</th>
                </tr>
              </thead>

              <tbody>
                <tr class="data" v-for="user in users" :key="user.user_id">
                  <td><input v-model="user.firstname" /></td>
                  <td><input v-model="user.lastname" /></td>
                  <td><input v-model="user.user_role" /></td>
                  <td><input v-model="user.username" /></td>
                  <td>
                    <button class="updateButton" @click="updateUser(user)">
                      Update
                    </button>
                  </td>
                  <td>
                    <button class="deleteButton" @click="deleteUser(user)">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      newUser: {
        firstname: "",
        lastname: "",
        user_role: "",
        username: "",
      },
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async updateUser(user) {
      try {
        await axios.put(
          `http://localhost:3000/api/users/${user.user_id}`,
          user
        );
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    async deleteUser(user) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${user.user_id}`);
        this.fetchUsers(); // Refresh the list of users
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
  },
};
</script>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrap {
  flex: 1;
}
</style>
