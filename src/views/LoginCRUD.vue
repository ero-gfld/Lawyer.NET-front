<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">User Management</h1>

    <div class="flex space-x-2 mb-4">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="fetchUsers">Load Users</button>
      <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="setCreateMode">Add New User</button>
    </div>

    <div v-if="users && users.length > 0">
      <ul class="list-disc pl-5">
        <li v-for="user in users" :key="user.id" class="mb-2">
          <span class="font-medium">{{ user.username }}</span> - {{ user.role }}
          <button class="ml-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded text-xs" @click="editUser(user)">Edit</button>
          <button class="ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs" @click="deleteUser(user.id)">Delete</button>
        </li>
      </ul>
    </div>

    <!-- User Form for Add/Edit -->
    <div class="mt-6">
      <h2 class="text-xl font-bold mb-3">{{ isEditMode ? 'Edit User' : 'Add User' }}</h2>
      <form @submit.prevent="isEditMode ? updateExistingUser() : createNewUser()" class="grid grid-cols-1 gap-4">
        <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="userFormData.username" placeholder="Username" />
        <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="userFormData.firstName" placeholder="First Name" />
        <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="userFormData.lastName" placeholder="Last Name" />
        <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="userFormData.email" type="email" placeholder="Email" />
        <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="userFormData.role" placeholder="Role" />
        <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="userFormData.password" placeholder="New Password" />
        <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="userFormData.passwordConfirmation" placeholder="Confirm Password" />
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{{ isEditMode ? 'Update' : 'Create' }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore'; 
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const userStore = useUserStore();
    const { users } = storeToRefs(userStore);
    const isEditMode = ref(false);
    const userFormData = ref({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      role: ''
    });

    function fetchUsers() {
      console.log("fetchUsers method called");
      userStore.fetchUsers();
    }

    function editUser(user) {
  isEditMode.value = true;
  userFormData.value = { ...user };
  userFormData.value.password = '';
  userFormData.value.passwordConfirmation = '';
}


function createNewUser() {
  if (userFormData.value.password !== userFormData.value.passwordConfirmation) {
    alert("Passwords do not match.");
    return;
  }

  const { passwordConfirmation, ...newUser } = userFormData.value;
  console.log(passwordConfirmation)

  newUser.appointments = userFormData.value.appointments || [];

  userStore.createUser(newUser);
  resetForm();
}



    function updateExistingUser() {
      if (userFormData.value.password !== userFormData.value.passwordConfirmation) {
      alert("Passwords do not match.");}
      userStore.updateUser(userFormData.value.id, userFormData.value);
      resetForm();
      isEditMode.value = false;
    }

    function deleteUser(userId) {
      userStore.deleteUser(userId);
    }

    function setCreateMode() {
  isEditMode.value = false;
  userFormData.value = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  };
}



    function resetForm() {
      userFormData.value = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        role: ''
      };
    }

    return {
      users,
      isEditMode,
      userFormData,
      fetchUsers,
      editUser,
      createNewUser,
      updateExistingUser,
      deleteUser,
      setCreateMode 
    };
  },
};
</script>
