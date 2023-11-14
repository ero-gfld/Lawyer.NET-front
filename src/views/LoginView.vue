<template>
    <div>
      <h2>Sign In</h2>
      <form @submit.prevent="onSignIn">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email">
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password">
        </div>
        <button type="submit">Sign In</button>
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
      onSignIn() {
        // Handle sign-in logic here
        console.log("Signed in with", this.email, this.password);
      }
    }
  };
  </script>
  