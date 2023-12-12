<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-xs">
      <h2 class="mb-6 text-2xl font-bold text-center text-gray-700">Sign In</h2>
      <form @submit.prevent="onSignIn" class="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="username">Username:</label>
          <input class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            id="username"
            v-model="formData.username"
            placeholder="Enter username"
            @blur="validate('username')">
            <p class="errors text-xs text-red-500" v-if="!!errors.username">{{errors.username}}</p>
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="password">Password:</label>
          <input class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="Enter password"
            @blur="validate('password')">
            <p class="errors text-xs text-red-500" v-if="!!errors.password">{{errors.password}}</p>
        </div>
        <div class="flex items-center justify-between">
          <button class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit">Sign In
          </button>
        </div>
      </form>
    </div>
  </div>

  <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="fixed z-10 inset-0 overflow-y-auto" id="my-modal">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div>
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div class="mt-3 text-center sm:mt-5">
                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                        Error
                    </h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500">
                          Incorrect username or password. Please try again.
                        </p>
                    </div>
                </div>
            </div>
            <div class="mt-5 sm:mt-6">
                <button
                    class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                    @click="closeModal()">
                    OK
                </button>
            </div>
        </div>
    </div>
    </div>
  </div>

</template>

  
  <script>
  import { useLoginStore } from '@/stores/login'
  import * as Yup from 'yup';

  const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  const loginStore = useLoginStore()

  export default {
    data() {
      return {
        showModal: false,
        formData: {
          username: "",
          password: ""
        },
        errors: {
          username: "",
          password: ""
        }
      };
    },
    methods: {

      onSignIn(){
        schema.validate(this.formData, {abortEarly: false})
          .then(() => {
        
            loginStore.login(this.formData.username, this.formData.password)
              .then(() => {
                  if (loginStore.isLogin) {return}
                  this.showModal = true;
              })
              .catch((error) => {
                  console.error(error);
                  this.showModal = true;
              })
          })
          .catch((err) => {
            err.inner.forEach((error) => {
              this.errors = { ...this.errors, [error.path]: error.message };
              console.log(error.message)
            });
          });
      },

      validate(field) {
        schema.validateAt(field, this.formData)
          .then(() => (this.errors[field] = ""))
          .catch((err) => {
            this.errors[err.path] = err.message;
          });
      },

      closeModal() {
        this.showModal = false;
      }
    }
  };
  </script>
  