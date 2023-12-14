<template>
  <div class="p-4 bg-white text-primary rounded-lg shadow-xl">
    <div class="flex flex-row gap-x-4">
      <div>
        <v-icon
          v-if="notification.type === ButtonTypes.SUCCESS"
          name="fa-check-circle"
        />
        <v-icon
          v-else-if="notification.type === ButtonTypes.INFO"
          name="fa-info-circle"
        />
      </div>
      <div>
        <p class="text-sm font-semibold">{{ notification.title }}</p>
        <p class="text-xs text-primary-lighter">
          {{ notification.message }}
        </p>
      </div>
      <Button
        :button-type="ButtonTypes.ICON"
        @click="closeNotification"
        class="ml-auto"
      >
        <v-icon name="io-close-sharp" scale="1" />
      </Button>
    </div>
  </div>
</template>

<script>
import { OhVueIcon } from "oh-vue-icons";
import Button from "@/components/atoms/Button.vue";
import ButtonTypes from "@/constants/button-types";
import { useNotificationStore } from "@/stores/notificationStore";

export default {
  name: "NotificationModal",
  props: {
    notification: {
      id: String,
      title: String,
      message: String,
      type: String,
      isShown: Boolean,
    },
  },
  components: {
    "v-icon": OhVueIcon,
    Button,
  },
  data() {
    return {
      ButtonTypes,
      notificationStore: useNotificationStore(),
    };
  },
  methods: {
    closeNotification() {
      this.notificationStore.closeNotification(this.notification.id);
    },
  },
};
</script>
