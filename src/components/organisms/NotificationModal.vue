<template>
  <div class="p-4 bg-white text-primary rounded-lg shadow-xl">
    <div class="flex flex-row gap-x-4">
      <div>
        <v-icon
          v-if="notification.type === BUTTON_TYPES.SUCCESS"
          name="fa-check-circle"
        />
        <v-icon
          v-else-if="notification.type === BUTTON_TYPES.INFO"
          name="fa-info-circle"
        />
      </div>
      <div>
        <p class="text-sm font-semibold">{{ notification.title }}</p>
        <p class="text-xs text-primary-lighter">
          {{ notification.message }}
        </p>
      </div>
      <Button :button-type="BUTTON_TYPES.ICON" class="ml-auto">
        <v-icon name="io-close-sharp" scale="1" />
      </Button>
    </div>
  </div>
</template>

<script>
import { OhVueIcon } from "oh-vue-icons";
import Button from "@/components/atoms/Button.vue";
import BUTTON_TYPES from "@/constants/button-types.js";
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
      BUTTON_TYPES,
    };
  },
};
</script>
