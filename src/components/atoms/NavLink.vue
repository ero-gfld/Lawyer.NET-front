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
  <div class="relative" @click="toggleDropdown" @mouseleave="hideDropdown">
    <router-link
      :to="link ?? ''"
      class="flex px-4 py-1 font-semibold border rounded-md border-white items-center"
    >
      <slot></slot>
    </router-link>
    <transition
      enter-active-class="duration-100 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-show="showDropdown && dropdownItems && dropdownItems.length > 0"
        class="absolute top-full left-0 w-full z-30"
      >
        <div class="h-2" />
        <div class="grid bg-primary border py-2 border-white rounded-md z-10">
          <router-link
            v-for="(item, index) in dropdownItems"
            :key="index"
            :to="item.link ?? ''"
            class="flex justify-around py-2 transition-all duration-300 ease-in-out hover:font-semibold hover:bg-primary-light"
          >
            <v-icon v-if="item.icon" :name="item.icon" :scale="item.scale" />
            <span v-if="item.label">{{ item.label }}</span>
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>
