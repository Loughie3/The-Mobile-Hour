<template>
  <div>
    <h1 class="heading">View All Users - Manager Only</h1>
    <div class="row">
      <div class="col">
        <main>
          <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/admin/dashboard">Admin Dashboard</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                View Users
              </li>
            </ol>
          </nav>
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
        </main>
        <aside>
          <h2 class="heading">Add New User</h2>
          <div class="container bottom-container">
            <form @submit.prevent="addUser">
              <table class="table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    <th>User Name</th>
                    <th>Password</th>
                    <th>Edit User</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        maxlength="20"
                        required
                        v-model="newUser.firstname"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        maxlength="20"
                        required
                        v-model="newUser.lastname"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        maxlength="10"
                        required
                        v-model="newUser.user_role"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        maxlength="20"
                        required
                        v-model="newUser.username"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        required
                        pattern="^[a-zA-Z0-9]+$"
                        minlength="6"
                        maxlength="20"
                        v-model="newUser.user_password"
                      />
                    </td>
                    <td>
                      <button type="submit" class="addButton">Add</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </aside>
      </div>
    </div>
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
        user_password: "",
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
    async addUser() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/users",
          this.newUser
        );
        this.users.push(response.data);
        this.newUser = {
          firstname: "",
          lastname: "",
          user_role: "",
          username: "",
          user_password: "",
        };
      } catch (error) {
        console.error("Error adding User:", error);
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

<style scoped>
h2 {
  padding: 0;
}
</style>
