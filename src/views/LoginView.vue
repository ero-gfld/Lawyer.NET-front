<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-xs">
      <h2 class="mb-6 text-2xl font-bold text-center text-gray-700">Sign In</h2>
      <form
        @submit.prevent="onSignIn"
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
            type="text"
            id="username"
            v-model="formData.username"
            placeholder="Enter username"
            @blur="validate('username')"
          />
          <p class="errors text-xs text-red-500" v-if="!!errors.username">
            {{ errors.username }}
          </p>
        </div>
        <div class="mb-6">
          <label
            class="block mb-2 text-sm font-bold text-gray-700"
            for="password"
            >Password:</label
          >
          <input
            class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="Enter password"
            @blur="validate('password')"
          />
          <p class="errors text-xs text-red-500" v-if="!!errors.password">
            {{ errors.password }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useLoginStore } from "@/stores/loginStore";
import * as Yup from "yup";
import { useErrorStore } from "@/stores/errorStore";
import { useNotificationStore } from "@/stores/notificationStore";
import NOTIFICATION_TYPES from "@/constants/notification-types";

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const loginStore = useLoginStore();

export default {
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
      errors: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSignIn() {
      schema
        .validate(this.formData, { abortEarly: false })
        .then(() => {
          loginStore
            .login(this.formData.username, this.formData.password)
            .then(() => {
              useNotificationStore().generateNotification(
                "Login successful",
                "You have successfully logged in.",
                NOTIFICATION_TYPES.SUCCESS
              );
            })
            .catch((error) => {
              useErrorStore().showError(
                `Incorrect username or password. Please try again.`,
                error.message
              );
            });
        })
        .catch((err) => {
          err.inner.forEach((error) => {
            this.errors = { ...this.errors, [error.path]: error.message };
          });
        });
    },

    validate(field) {
      schema
        .validateAt(field, this.formData)
        .then(() => (this.errors[field] = ""))
        .catch((err) => {
          this.errors[err.path] = err.message;
        });
    },
  },
};
</script>
