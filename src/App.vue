<script>
import NavBar from "@/components/molecules/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<template>
  <NavBar />
  <router-view />
</template>

<style></style>
