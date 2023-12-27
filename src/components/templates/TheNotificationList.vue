<script setup lang="ts">
import { useNotificationStore } from "@/stores/NotificationStore";
import NotificationModal from "@/components/organisms/NotificationModal.vue";
const notificationStore = useNotificationStore();
</script>

<template>
  <div class="fixed grid flex-col top-5 right-5 z-50 gap-y-3">
    <notification-modal
      v-for="notification in notificationStore.notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>
@/stores/NotificationStore
