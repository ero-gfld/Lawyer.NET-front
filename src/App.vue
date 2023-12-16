<script setup lang="ts">
import { useLoginStore } from "@/stores/LoginStore";
import { onMounted } from "vue";
import TheNavBar from "@/components/templates/TheNavBar.vue";
import TheErrorModal from "@/components/templates/TheErrorModal.vue";
import TheNotificationList from "@/components/templates/TheNotificationList.vue";

const loginStore = useLoginStore();

async function tryLogin() {
  if (loginStore.hasJwtToken() && !loginStore.isLoggedIn) {
    await loginStore.fetchUser();
  }
}

onMounted(async () => {
  await tryLogin();
});
</script>

<template>
  <the-nav-bar />
  <the-notification-list />
  <the-error-modal />
  <router-view />
</template>
