<script setup lang="ts">
import { useLoginStore } from "@/stores/LoginStore";
import { Ref, ref } from "vue";
import * as Yup from "yup";

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const loginStore = useLoginStore();

const formData = ref({
  username: "",
  password: "",
});

const errors: Ref<{ [id: string]: string }> = ref({
  username: "",
  password: "",
});

function onSignIn() {
  schema
    .validate(formData.value, { abortEarly: false })
    .then(() => {
      loginStore.login(formData.value.username, formData.value.password);
    })
    .catch((err: Yup.ValidationError) => {
      err.inner.forEach((e) => {
        if (e.path) errors.value[e.path] = e.message;
      });
    });
}

function validate(field: string) {
  schema
    .validateAt(field, formData.value)
    .then(() => (errors.value[field] = ""))
    .catch((err) => {
      errors.value[err.path] = err.message;
    });
}
</script>

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
          <span class="text-xs text-red-500" v-if="!!errors.username">
            {{ errors.username }}
          </span>
        </div>
        <div class="mb-6">
          <label
            class="block mb-2 text-sm font-bold text-gray-700"
            for="password"
            >Password:</label
          >
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="Enter password"
            @blur="validate('password')"
          />
          <span class="text-xs text-red-500" v-if="!!errors.password">
            {{ errors.password }}
          </span>
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
