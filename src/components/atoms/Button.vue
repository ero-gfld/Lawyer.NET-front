<template>
  <button :class="buttonClass" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
import ButtonTypes from "../../constants/button-types.js";
export default {
  name: "Button",
  props: {
    handleClick: Function,
    buttonType: {
      type: String,
      default: ButtonTypes.PRIMARY,
    },
  },
  data() {
    return {
      buttonClass: this.getClass(this.buttonType),
    };
  },
  methods: {
    getClass(type) {
      console.log("hello", type);
      switch (type) {
        case ButtonTypes.PRIMARY:
          return "bg-primary text-white px-3 py-1 rounded-lg text-sm";
        case ButtonTypes.SECONDARY:
          return "border text-stone-700 font-semibold px-3 py-1 rounded-lg text-sm";
      }
    },
  },
};
</script>
