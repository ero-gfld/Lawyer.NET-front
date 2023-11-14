<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="onRegister">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email">
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password">
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      onRegister() {
        // Handle registration logic here
        console.log("Registered with", this.email, this.password);
      }
    }
  };
  </script>
  