import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import NOTIFICATION_TYPES from "@/constants/NotificationTypes";
import NotificationModel from "@/models/NotificationModel";

export const useNotificationStore = defineStore("notificationStore", {
  state: () => ({
    notifications: [] as NotificationModel[],
  }),
  actions: {
    closeNotification(id: string) {
      const index = this.notifications.findIndex((n) => n.id === id);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    },
    generateNotification(
      title: string,
      message: string,
      type = NOTIFICATION_TYPES.INFO
    ) {
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
