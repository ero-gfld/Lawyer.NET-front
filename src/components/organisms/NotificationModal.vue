<script setup lang="ts">
import VButton from "@/components/atoms/VButton.vue";
import ButtonTypes from "@/constants/ButtonTypes";
import NotificationTypes from "@/constants/NotificationTypes";
import { useNotificationStore } from "@/stores/notificationStore";
import { defineProps } from "vue";

const props = defineProps<{
  notification: {
    id: string;
    title: string;
    message: string;
    type: string;
    isShown: boolean;
  };
}>();

const notificationStore = useNotificationStore();

function closeNotification() {
  notificationStore.closeNotification(props.notification.id);
}
</script>

<template>
  <div class="p-4 bg-white text-primary rounded-lg shadow-xl">
    <div class="flex flex-row gap-x-4">
      <div>
        <v-icon
          v-if="notification.type === NotificationTypes.SUCCESS"
          name="fa-check-circle"
        />
        <v-icon
          v-else-if="notification.type === NotificationTypes.INFO"
          name="fa-info-circle"
        />
      </div>
      <div>
        <p class="text-sm font-semibold">{{ notification.title }}</p>
        <p class="text-xs text-primary-lighter">
          {{ notification.message }}
        </p>
      </div>
      <v-button
        :button-type="ButtonTypes.ICON"
        @click="closeNotification"
        class="ml-auto"
      >
        <v-icon name="io-close-sharp" scale="1" />
      </v-button>
    </div>
  </div>
</template>
