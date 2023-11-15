<template>
  <input
    class="py-1 px-2 border rounded-md"
    :id="id"
    :type="type"
    :value="value"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  name: "Label",
  props: {
    id: String,
    type: String,
    value: String,
    placeholder: String,
  },
};
</script>
