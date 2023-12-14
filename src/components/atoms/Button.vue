<template>
  <button :class="getClass(this.buttonType)" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
import ButtonTypes from "@/constants/ButtonTypes";
export default {
  name: "Button",
  props: {
    handleClick: Function,
    buttonType: {
      type: String,
      default: ButtonTypes.PRIMARY,
    },
  },
  methods: {
    getClass() {
      switch (this.buttonType) {
        case ButtonTypes.PRIMARY:
          return "bg-primary text-white px-3 py-1 rounded-lg text-sm hover:bg-primary-light active:bg-primary-lighter";
        case ButtonTypes.SECONDARY:
          return "border text-stone-700 font-semibold px-3 py-1 rounded-lg text-sm";
        case ButtonTypes.ICON:
          return "text-primary hover:text-primary-light active:text-primary-lighter";
      }
      return "";
    },
  },
};
</script>
@/constants/ButtonTypes
