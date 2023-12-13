<template>
  <div class="fixed grid flex-col top-5 right-5 z-50 gap-y-3">
    <NotificationModal
      v-for="notification in notificationStore.notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import { useNotificationStore } from "@/stores/notificationStore";
import NotificationModal from "@/components/organisms/NotificationModal.vue";
export default {
  name: "Notifications",
  data() {
    console.log(useNotificationStore().notifications, "qsdkl,,ddqsl");
    return {
      notificationStore: useNotificationStore(),
    };
  },
  components: {
    NotificationModal,
  },
};
</script>
