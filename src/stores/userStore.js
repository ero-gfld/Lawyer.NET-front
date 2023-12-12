import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userInfo: null,
        users: [], 
    }),
    actions: {
        getAuthHeader() {
            const token = localStorage.getItem("access_token");
            return {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
        },

        fetchUsers() {
            axios.get('http://localhost:8083/api/users', this.getAuthHeader())
            .then(response => {
                this.users = response.data;
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
        },


        createUser(userData) {
            axios.post('http://localhost:8083/api/users/new', userData, this.getAuthHeader())
            .then(() => {
                this.fetchUsers();
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
        },

        updateUser(userId, updatedData) {
            axios.put(`http://localhost:8083/api/users/${userId}`, updatedData, this.getAuthHeader())
            .then(response => {
                const index = this.users.findIndex(user => user.id === userId);
                if (index !== -1) {
                    this.users[index] = response.data;
                }
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
        },

        deleteUser(userId) {
            axios.delete(`http://localhost:8083/api/users/${userId}`, this.getAuthHeader())
            .then(() => {
                this.users = this.users.filter(user => user.id !== userId);
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
        }
    }
});
