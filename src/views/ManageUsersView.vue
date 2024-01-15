<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">User Management</h1>

    <div class="flex space-x-2 mb-4">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="fetchUsers"
      >
        Load Users
      </button>
      <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        @click="setCreateMode"
      >
        Add New User
      </button>
    </div>

    <div v-if="users && users.length > 0">
      <ul class="list-disc pl-5">
        <li v-for="user in users" :key="user.id" class="mb-2">
          <img :src="userImages[user.id] || ''" alt="Users's Photo" class="w-20 h-20 object-cover rounded-full">
          <span class="font-medium">{{ user.username }}</span> - {{ user.role }}
          <button
            class="ml-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded text-xs"
            @click="editUser(user)"
          >
            Edit
          </button>
          <button
            class="ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
            @click="deleteUser(user.id)"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>

    <!-- User Form for Add/Edit -->
    <div class="mt-6">
      <h2 class="text-xl font-bold mb-3">
        {{ isEditMode ? "Edit User" : "Add User" }}
      </h2>
      <form
        @submit.prevent="submitUser"
        class="grid grid-cols-1 gap-4"
      >
      <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.salutation"
          placeholder="Salutation"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.username"
          placeholder="Username"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.firstName"
          placeholder="First Name"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.lastName"
          placeholder="Last Name"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.email"
          type="email"
          placeholder="Email"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.countryCode"
          placeholder="Country Code"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.role"
          placeholder="Role"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.password"
          placeholder="New Password"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.passwordConfirmation"
          placeholder="Confirm Password"
        />
        <div class="mb-4">
                <label for="fileUpload" class="block text-gray-700 text-sm font-bold mb-2">User Photo:</label>
                <input type="file" id="fileUpload" @change="handleFileUpload" class="border rounded w-full text-gray-700 py-3 px-4" />
              </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {{ isEditMode ? "Update" : "Create" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from "@/models/UserModel";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { watchEffect } from 'vue';

interface UserImages {
  [key: string]: string | null | undefined; // Allowing string, null, and undefined
}

const userImages = ref<UserImages>({});

// States
const userStore = useUserStore();
const { users} = storeToRefs(userStore);
const isEditMode = ref(false);


watchEffect(async () => {
  console.log('WatchEffect: Start fetching user images');
  for (const user of users.value) {
    try {
      console.log(`Fetching image for user ${user.id}`);
      console.log(`photoBucket for user ${user.id}: ${user.photoBucket}`);
      console.log(`photoName for user ${user.id}: ${user.photoName}`);
      const imageUrl = await userStore.getFile(user.photoBucket, user.photoName);
      console.log(`Image URL for user ${user.id}: ${imageUrl}`);
      userImages.value[user.id] = imageUrl ?? undefined; // Convert null to undefined
    } catch (error) {
      console.error('Error loading image for user:', user.id, error);
      userImages.value[user.id] = undefined;
    }
  }
  console.log('WatchEffect: Finished fetching user images');
});


const userFormData = ref<UserModel>({
  id: '', // Add an appropriate value for the user's ID
  salutation: '',
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '',
  role: '',
  appointments: [], // Add an empty array or appropriate data for user appointments
  photoBucket: '',
  photoName: '',
  password: '',
  passwordConfirmation: '',
});

    const selectedFile = ref<File | null>(null);

    function fetchUsers() {
      console.log("fetchUsers method called");
      userStore.fetchUsers();
    }

    function editUser(user: UserModel) {
      isEditMode.value = true;
      userFormData.value = { ...user };
      userFormData.value.password = "";
      userFormData.value.passwordConfirmation = "";
    }

    function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input && input.files) {
    selectedFile.value = input.files[0];
  }
}

async function submitUser() {
  if (isEditMode.value) {
    if (!selectedFile.value) {
      alert("Please select a file to upload.");
      return;
    }
    const file = selectedFile.value; // Get the file from the Ref object
    const fileName = file.name; // Access the name property of the File object
    await uploadFile(userFormData.value.id, fileName);
    userFormData.value.photoName = `${userFormData.value.id}_${fileName}`
    await userStore.updateUser(userFormData.value.id, userFormData.value);
    resetForm();
    isEditMode.value = false;
  } else {
    if (!selectedFile.value) {
      alert("Please select a file to upload.");
      return;
    }
    try {
      const uuid = uuidv4();
      const file = selectedFile.value; // Get the file from the Ref object
      const fileName = file.name; // Access the name property of the File object
      await uploadFile(uuid, fileName); // Pass fileName as an argument
      userFormData.value.id = uuid;
      // Use template literals to construct the photoPath string
      userFormData.value.photoBucket = 'lawyers'
      userFormData.value.photoName = `${uuid}_${fileName}`;
      await userStore.createUser(userFormData.value);
      resetForm();
    } catch (error) {
      alert("Error uploading file.");
      console.error("Error uploading file: ", error);
    }
  }
}

    async function uploadFile(uuid: string, fileName: string) {
  if (!selectedFile.value) {
    alert("No file selected for upload.");
    return Promise.reject("No file selected for upload.");
  }
  
  // Pass the fileName to the uploadPhoto method as well
  await userStore.uploadPhoto(selectedFile.value, "lawyers", `${uuid}_${fileName}`);
}

    function deleteUser(userId: string) {
      userStore.deleteUser(userId);
    }

    function setCreateMode() {
      isEditMode.value = false;
      resetForm();
    }

    function resetForm() {
      userFormData.value = {
        id: "",
        salutation: "",
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        countryCode: "",
        role: "",
        appointments:[],
        photoBucket: '',
        photoName: '',
        passwordConfirmation: '',
      };
      selectedFile.value = null;
    }

</script>
