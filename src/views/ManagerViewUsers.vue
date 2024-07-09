<template>
  <h2>Welcome back Manager</h2>
  <div>
    <h1 class="heading">View All Users</h1>
    <div class="row">
      <div class="col">
        <main>
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
            <table class="table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                  <th>User Name</th>
                  <th>Edit User</th>

                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input v-model="newUser.firstname" /></td>
                  <td><input v-model="newUser.lastname" /></td>
                  <td><input v-model="newUser.user_role" /></td>
                  <td><input v-model="newUser.username" /></td>
                  <td>
                    <button class="addButton" @click="addUser">Add</button>
                  </td>
                </tr>
              </tbody>
            </table>
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
          user_role: 0,
          username: 0,
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

<style></style>
