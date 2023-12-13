import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import NOTIFICATION_TYPES from "@/constants/notification-types";

export const useNotificationStore = defineStore("notificationStore", {
  state: () => ({
    notifications: [],
  }),
  actions: {
    closeNotification(id) {
      this.notifications[id].isShown = false;
    },
    generateNotification(
      message,
      type = NOTIFICATION_TYPES.INFO,
      isShown = true
    ) {
      const id = uuidv4();
      this.notifications.push({
        id: id,
        type: type,
        message: message,
        isShown: isShown,
      });
      return id;
    },
    eraseNotification(id) {
      this.notifications.splice(id, 1);
    },
  },
});
