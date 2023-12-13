<script>
import NavBar from "@/components/molecules/NavBar.vue";
import { useLoginStore } from "@/stores/loginStore";
import ErrorModal from "@/components/templates/ErrorModal.vue";
export default {
  name: "App",
  components: {
    NavBar,
    ErrorModal,
  },
  methods: {
    tryLogin() {
      const loginStore = useLoginStore();
      if (loginStore.hasJwtToken && !loginStore.isLogin) {
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
  <ErrorModal />
  <router-view />
</template>
