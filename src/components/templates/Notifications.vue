<template>
  <div>
    <NotificationModal
      :v-for:="notification in notificationStore.notifications"
    />
  </div>
</template>

<script>
import { useNotificationStore } from "@/stores/notificationStore";
import NotificationModal from "@/components/organisms/NotificationModal.vue";
export default {
  name: "Notifications",
  data() {
    return {
      notificationStore: useNotificationStore(),
    };
  },
  components: {
    NotificationModal,
  },
};
</script>
