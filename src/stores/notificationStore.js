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
      },
      {
        id: uuidv4(),
        title: "Login successful",
        message: "You are now logged in.",
        type: NOTIFICATION_TYPES.SUCCESS,
      },
    ],
  }),
  actions: {
    closeNotification(id) {
      const index = this.notifications.findIndex((n) => n.id === id);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    },
    generateNotification(title, message, type = NOTIFICATION_TYPES.INFO) {
      const id = uuidv4();
      this.notifications.push({
        id: id,
        type: type,
        title: title,
        message: message,
      });
      return id;
    },
  },
});
