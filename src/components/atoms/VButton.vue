<script setup lang="ts">
import ButtonTypes from "@/constants/ButtonTypes";
import { defineProps } from "vue";

const props = defineProps({
  handleClick: {
    type: Function,
    required: false,
  },
  buttonType: {
    type: String,
    default: ButtonTypes.PRIMARY,
    required: false,
  },
});

function getClass() {
  switch (props.buttonType) {
    case ButtonTypes.PRIMARY:
      return "bg-primary text-white px-3 py-1 rounded-lg text-sm hover:bg-primary-light active:bg-primary-lighter";
    case ButtonTypes.SECONDARY:
      return "border text-stone-700 font-semibold px-3 py-1 rounded-lg text-sm";
    case ButtonTypes.ICON:
      return "text-primary hover:text-primary-light active:text-primary-lighter";
  }
}
</script>

<template>
  <button :class="getClass()" @click="props.handleClick">
    <slot></slot>
  </button>
</template>
