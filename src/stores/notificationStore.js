import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import NOTIFICATION_TYPES from "@/constants/notification-types";

export const useNotificationStore = defineStore("notificationStore", {
  state: () => ({
    notifications: [
      {
        id: uuidv4(),
        title: "Welcome to the app",
        message: "This is a welcome message.",
        type: NOTIFICATION_TYPES.INFO,
        isShown: true,
      },
      {
        id: uuidv4(),
        title: "Login successful",
        message: "You are now logged in.",
        type: NOTIFICATION_TYPES.SUCCESS,
        isShown: true,
      },
    ],
  }),
  actions: {
    closeNotification(id) {
      this.notifications[id].isShown = false;
    },
    generateNotification(
      title,
      message,
      type = NOTIFICATION_TYPES.INFO,
      isShown = true
    ) {
      const id = uuidv4();
      this.notifications.push({
        id: id,
        type: type,
        title: title,
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
