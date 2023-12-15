<script setup lang="ts">
import { useLoginStore } from "@/stores/loginStore";
import { onMounted } from "vue";
import TheNavBar from "@/components/templates/TheNavBar.vue";
import TheErrorModal from "@/components/templates/TheErrorModal.vue";
import TheNotificationList from "@/components/templates/TheNotificationList.vue";

function tryLogin() {
  const loginStore = useLoginStore();
  if (loginStore.hasJwtToken() && !loginStore.isLogin) {
    loginStore.getUserInfo();
  }
}

onMounted(() => {
  tryLogin();
});
</script>

<template>
  <the-nav-bar />
  <the-notification-list />
  <the-error-modal />
  <router-view />
</template>
