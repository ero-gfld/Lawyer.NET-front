<script>
import NavBar from "@/components/molecules/NavBar.vue";
import { useLoginStore } from "@/stores/loginStore";
export default {
  name: "App",
  components: {
    NavBar,
  },
  methods: {
    tryLogin() {
      const loginStore = useLoginStore();
      if (loginStore.hasJwtToken) {
        loginStore.getUserInfo();
      }
    },
  },
  created() {
    this.tryLogin();
  },
};
</script>

<template>
  <NavBar />
  <router-view />
</template>
