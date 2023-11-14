<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-xs">
      <h2 class="mb-6 text-2xl font-bold text-center text-gray-700">Register</h2>
      <form @submit.prevent="onRegister" class="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="email">Email:</label>
          <input class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="email" id="email" v-model="email" placeholder="Enter email">
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="password">Password:</label>
          <input class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="password" id="password" v-model="password" placeholder="Enter password">
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="name">Name:</label>
          <input class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" id="name" v-model="name" >
        </div>

        <!-- Last Name Field -->
        <div class="mb-6">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="lastName">Last Name:</label>
          <input class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" id="lastName" v-model="lastName" >
        </div>
        <div class="flex items-center justify-between">
          <button class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

  
<script>
export default {
  data() {
    return {
      name: '',
      lastName: '',
      email: '',
      password: ''
    };
  },
  methods: {
    onRegister() {
      // Handle registration logic here
      console.log("Registered with", this.name, this.lastName, this.email, this.password);
    }
  }
};
</script>

  