<template>
  <div
    class="fixed bottom-0 right-0 mb-4 mr-4 p-4 bg-primary text-white rounded shadow z-50"
  >
    <div class="flex items-center">
      <v-icon name="io-notifications-sharp" />
      <div class="mr-4" />
      <div>
        <p class="text-sm font-medium">Login successful</p>
        <p class="text-xs">We are glad to see you're back!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { OhVueIcon } from "oh-vue-icons";
export default {
  name: "NotificationModal",
  props: {
    notification: {
      type: {
        title: String,
        message: String,
        type: String,
      },
      required: true,
    },
  },
  components: {
    "v-icon": OhVueIcon,
  },
};
</script>
