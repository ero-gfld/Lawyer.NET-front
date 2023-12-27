<script setup lang="ts">
import LabelTypes from "@/constants/LabelTypes";
import { defineProps } from "vue";

const props = defineProps<{
  labelType?: LabelTypes;
}>();

function getClass(): string {
  switch (props.labelType) {
    case LabelTypes.PRIMARY || undefined:
      return "text-black";
    case LabelTypes.DANGER:
      return "text-red-500";
    default:
      return "";
  }
}
</script>

<template>
  <label :class="[$attrs.class, getClass()]">
    <slot></slot>
  </label>
</template>
