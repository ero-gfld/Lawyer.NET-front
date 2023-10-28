<script>
import { OhVueIcon } from "oh-vue-icons";
export default {
  name: "NavLink",
  props: {
    link: {
      type: String,
      required: false,
    },
    dropdownItems: {
      type: Array,
      required: false,
    },
  },
  components: {
    "v-icon": OhVueIcon,
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = true;
    },
    hideDropdown() {
      this.showDropdown = false;
    },
  },
};
</script>

<template>
  <div class="relative" @mouseover="toggleDropdown" @mouseleave="hideDropdown">
    <router-link
      :to="link ?? ''"
      class="flex px-4 py-1 font-semibold border rounded-md border-white items-center"
    >
      <slot></slot>
    </router-link>
    <div
      v-show="showDropdown"
      class="absolute top-full left-0 w-full bg-primary rounded-md z-10"
    >
      <router-link
        v-for="(item, index) in dropdownItems"
        :key="index"
        :to="item.link ?? ''"
        class="block px-4 py-2"
      >
        <v-icon v-if="item.icon" :name="item.icon" />
        <span v-if="item.label">{{ item.label }}</span>
      </router-link>
    </div>
  </div>
</template>
