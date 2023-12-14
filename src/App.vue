<script>
import NavBar from "@/components/templates/NavBar.vue";
import { useLoginStore } from "@/stores/loginStore";
import ErrorModal from "@/components/templates/ErrorModal.vue";
import Notifications from "@/components/templates/Notifications.vue";
export default {
  name: "App",
  components: {
    NavBar,
    ErrorModal,
    Notifications,
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
  <Notifications />
  <ErrorModal />
  <router-view />
</template>
