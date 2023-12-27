<template>
  <button :class="getClass(this.buttonType)" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
import BUTTON_TYPES from "@/constants/button-types.js";
export default {
  name: "Button",
  props: {
    handleClick: Function,
    buttonType: {
      type: String,
      default: BUTTON_TYPES.PRIMARY,
    },
  },
  methods: {
    getClass() {
      switch (this.buttonType) {
        case BUTTON_TYPES.PRIMARY:
          return "bg-primary text-white px-3 py-1 rounded-lg text-sm hover:bg-primary-light active:bg-primary-lighter";
        case BUTTON_TYPES.SECONDARY:
          return "border text-stone-700 font-semibold px-3 py-1 rounded-lg text-sm";
        case BUTTON_TYPES.ICON:
          return "text-primary hover:text-primary-light active:text-primary-lighter";
      }
      return "";
    },
  },
};
</script>
