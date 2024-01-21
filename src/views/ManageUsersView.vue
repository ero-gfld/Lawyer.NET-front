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
          <img
            :src="userImages[user.id || ''] || '/img/default-avatar.png'"
            alt="Users's Photo"
            class="w-20 h-20 object-cover rounded-full"
          />
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
      <form @submit.prevent="submitUser" class="grid grid-cols-1 gap-4">
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.salutation"
          placeholder="Salutation"
          @blur="validate('salutation')"
        />
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.salutation"
          >{{ validationErrors.salutation }}</v-label
        >
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.username"
          placeholder="Username"
          @blur="validate('username')"
        />
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.username"
          >{{ validationErrors.username }}</v-label
        >
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.firstName"
          placeholder="First Name"
          @blur="validate('firstName')"
        />
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.firstName"
          >{{ validationErrors.firstName }}</v-label
        >
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.lastName"
          placeholder="Last Name"
          @blur="validate('lastName')"
        />
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.lastName"
          >{{ validationErrors.lastName }}</v-label
        >
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.email"
          placeholder="Email"
          @blur="validate('email')"
        />
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.email"
          >{{ validationErrors.email }}</v-label
        >
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.countryCode"
          placeholder="Country Code"
          @blur="validate('countryCode')"
        />
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.countryCode"
          >{{ validationErrors.countryCode }}</v-label
        >
        <select
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.role"
          @blur="validate('role')"
        >
          <option value="" disabled>Select Role...</option>
          <option
            v-for="role in Object.values(UserRoles)"
            :key="role"
            :value="role"
          >
            {{ role }}
          </option>
        </select>
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.role"
          >{{ validationErrors.role }}</v-label
        >
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.password"
          placeholder="New Password"
          type="password"
          @blur="validate('password')"
        />
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.password"
          >{{ validationErrors.password }}</v-label
        >
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.passwordConfirmation"
          placeholder="Confirm Password"
          type="password"
          @blur="validate('passwordConfirmation')"
        />
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.passwordConfirmation"
          >{{ validationErrors.passwordConfirmation }}</v-label
        >
        <div class="mb-4">
          <label
            for="fileUpload"
            class="block text-gray-700 text-sm font-bold mb-2"
            >User Photo:</label
          >
          <input
            type="file"
            id="fileUpload"
            @change="handleFileUpload"
            class="border rounded w-full text-gray-700 py-3 px-4"
          />
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
import { Ref, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "@/models/UserModel";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";
import * as Yup from "yup";
import LabelTypes from "@/constants/LabelTypes";
import VLabel from "@/components/atoms/VLabel.vue";
import UserRoles from "@/constants/UserRoles";

interface UserImages {
  [key: string]: string | null | undefined; // Allowing string, null, and undefined
}

const userImages = ref<UserImages>({});

// States
const userStore = useUserStore();
const { users } = storeToRefs(userStore);
const isEditMode = ref(false);

watchEffect(async () => {
  console.log("WatchEffect: Start fetching user images");
  for (const user of users.value) {
    try {
      console.log(`Fetching image for user ${user.id}`);
      console.log(`photoBucket for user ${user.id}: ${user.photoBucket}`);
      console.log(`photoName for user ${user.id}: ${user.photoName}`);
      const imageUrl = await userStore.getFile(
        user.photoBucket,
        user.photoName,
        user.id
      );
      console.log(`Image URL for user ${user.id}: ${imageUrl}`);
      userImages.value[user.id] = imageUrl ?? undefined; // Convert null to undefined
    } catch (error) {
      console.error("Error loading image for user:", user.id, error);
      userImages.value[user.id] = undefined;
    }
  }
  console.log("WatchEffect: Finished fetching user images");
});

const userFormData = ref<UserModel>({
  id: "", // Add an appropriate value for the user's ID
  salutation: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "",
  role: "",
  appointments: [], // Add an empty array or appropriate data for user appointments
  photoBucket: "",
  photoName: "",
  password: "",
  passwordConfirmation: "",
});

const validationErrors: Ref<{ [id: string]: string }> = ref({
  salutation: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "",
  role: "",
  password: "",
  passwordConfirmation: "",
});

const schema = Yup.object().shape({
  role: Yup.string().required("Role is required"),
  salutation: Yup.string().required("Salutation is required"),
  countryCode: Yup.string()
    .required("Country is required")
    .max(2, "Conutry Code cannot contain more than 2 characters"),
  username: Yup.string()
    .min(5, "Username must be at least 5 characters long")
    .required("Username is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .min(12, "Password must be at least 12 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must include a mix of uppercase and lowercase letters, numbers, and symbols"
    )
    .required("Password is required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});

function validate(field: string) {
  schema
    .validateAt(field, userFormData.value)
    .then(() => (validationErrors.value[field] = ""))
    .catch((err) => {
      validationErrors.value[err.path] = err.message;
    });
}

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
  schema
    .validate(userFormData.value, { abortEarly: false })
    .then(() => {
      if (isEditMode.value) {
        if (!selectedFile.value) {
          alert("Please select a file to upload.");
          return;
        }
        const file = selectedFile.value; // Get the file from the Ref object
        const fileName = file.name; // Access the name property of the File object
        uploadFile(userFormData.value.id, fileName);
        userFormData.value.photoBucket = "lawyers";
        userFormData.value.photoName = `${userFormData.value.id}_${fileName}`;
        userStore.updateUser(userFormData.value.id, userFormData.value);
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
          uploadFile(uuid, fileName); // Pass fileName as an argument
          userFormData.value.id = uuid;
          // Use template literals to construct the photoPath string
          userFormData.value.photoBucket = "lawyers";
          userFormData.value.photoName = `${uuid}_${fileName}`;
          userStore.createUser(userFormData.value);
          resetForm();
        } catch (error) {
          alert("Error uploading file.");
          console.error("Error uploading file: ", error);
        }
      }
    })
    .catch((err: Yup.ValidationError) => {
      err.inner.forEach((e) => {
        if (e.path) validationErrors.value[e.path] = e.message;
      });
    });
}

async function uploadFile(uuid: string, fileName: string) {
  if (!selectedFile.value) {
    alert("No file selected for upload.");
    return Promise.reject("No file selected for upload.");
  }

  // Pass the fileName to the uploadPhoto method as well
  await userStore.uploadPhoto(selectedFile.value, "lawyers", fileName, uuid);
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
    appointments: [],
    photoBucket: "",
    photoName: "",
    passwordConfirmation: "",
  };
  selectedFile.value = null;
}
</script>
