<template>
  <input
    class="py-1 px-2 border rounded-md"
    :id="id"
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  name: "Input",
  props: {
    id: String,
    type: String,
    value: String,
    placeholder: String,
  },
};
</script>
