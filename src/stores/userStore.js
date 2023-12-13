import { defineStore } from "pinia";
import axios from "axios";
import apiConfig from "@/config/api-config.json";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userInfo: null,
    users: [],
  }),
  actions: {
    getAuthHeader() {
      const token = localStorage.getItem("access_token");
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    },

    fetchUsers() {
      axios
        .get(`${apiConfig.URL}/api/users`, this.getAuthHeader())
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    },

    createUser(userData) {
      axios
        .post(`${apiConfig.URL}/api/users/new`, userData, this.getAuthHeader())
        .then(() => {
          this.fetchUsers();
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    },

    async registerUser(userData) {
      await axios
        .post(`${apiConfig.URL}/api/users/new`, userData)
        .catch((error) => {
          console.error("Error creating user:", error);
          return {
            status: error.response.status,
            message: error.response.data.message,
          };
        });

      return {
        status: 200,
        message: "User created successfully.",
      };
    },

    updateUser(userId, updatedData) {
      axios
        .put(
          `${apiConfig.URL}/api/users/${userId}`,
          updatedData,
          this.getAuthHeader()
        )
        .then((response) => {
          const index = this.users.findIndex((user) => user.id === userId);
          if (index !== -1) {
            this.users[index] = response.data;
          }
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    },

    deleteUser(userId) {
      axios
        .delete(`${apiConfig.URL}/api/users/${userId}`, this.getAuthHeader())
        .then(() => {
          this.users = this.users.filter((user) => user.id !== userId);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    },
  },
});
