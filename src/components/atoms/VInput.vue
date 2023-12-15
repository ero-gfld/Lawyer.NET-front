<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
  id: String,
  type: String,
  modelValue: String,
  placeholder: String,
});
</script>

<template>
  <input
    class="py-1 px-2 border rounded-md"
    :id="props.id"
    :type="props.type"
    :value="props.modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    :placeholder="props.placeholder"
  />
</template>
