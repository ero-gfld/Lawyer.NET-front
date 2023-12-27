<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import RegistrationUserModel from "@/models/RegistrationUserModel";
import { Ref, ref } from "vue";
import VLabel from "@/components/atoms/VLabel.vue";
import LabelTypes from "@/constants/LabelTypes";
import * as Yup from "yup";

const userStore = useUserStore();

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string().required("Password is required"),
});

const userForm: Ref<RegistrationUserModel> = ref({
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

const validationErrors: Ref<{ [id: string]: string }> = ref({
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

function onRegister() {
  schema
    .validate(userForm.value, { abortEarly: false })
    .then(() => {
      userStore.createUser(userForm.value);
    })
    .catch((err: Yup.ValidationError) => {
      err.inner.forEach((e) => {
        if (e.path) validationErrors.value[e.path] = e.message;
      });
    });
}

function validate(field: string) {
  schema
    .validateAt(field, userForm.value)
    .then(() => (validationErrors.value[field] = ""))
    .catch((err) => {
      validationErrors.value[err.path] = err.message;
    });
}
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-xs">
      <h2 class="mb-6 text-2xl font-bold text-center text-gray-700">
        Register
      </h2>
      <form
        @submit.prevent="onRegister"
        class="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <div class="mb-4">
          <label
            class="block mb-2 text-sm font-bold text-gray-700"
            for="username"
            >Username:</label
          >
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="username"
            v-model="userForm.username"
            placeholder="Enter username"
            @blur="validate('username')"
          />
          <v-label
            :label-type="LabelTypes.DANGER"
            class="text-xs"
            v-if="validationErrors.username"
            >{{ validationErrors.username }}</v-label
          >
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="email"
            >Email:</label
          >
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            v-model="userForm.email"
            placeholder="Enter email"
            @blur="validate('email')"
          />
          <v-label
            :label-type="LabelTypes.DANGER"
            class="text-xs"
            v-if="validationErrors.email"
            >{{ validationErrors.email }}</v-label
          >
        </div>
        <div class="mb-4">
          <label
            class="block mb-2 text-sm font-bold text-gray-700"
            for="password"
            >Password:</label
          >
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            v-model="userForm.password"
            placeholder="Enter password"
            @blur="validate('password')"
          />
          <v-label
            :label-type="LabelTypes.DANGER"
            class="text-xs"
            v-if="validationErrors.password"
            >{{ validationErrors.password }}</v-label
          >
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="name"
            >Name:</label
          >
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            v-model="userForm.firstName"
            @blur="validate('firstName')"
          />
          <v-label
            :label-type="LabelTypes.DANGER"
            class="text-xs"
            v-if="validationErrors.firstName"
            >{{ validationErrors.firstName }}</v-label
          >
        </div>

        <!-- Last Name Field -->
        <div class="mb-6">
          <label
            class="block mb-2 text-sm font-bold text-gray-700"
            for="lastName"
            >Last Name:</label
          >
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            id="lastName"
            v-model="userForm.lastName"
            @blur="validate('lastName')"
          />
          <v-label
            :label-type="LabelTypes.DANGER"
            class="text-xs"
            v-if="validationErrors.lastName"
            >{{ validationErrors.lastName }}</v-label
          >
        </div>
        <div class="flex items-center justify-between">
          <button
            class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
