<script>
import { OhVueIcon } from "oh-vue-icons";
export default {
  name: "NavLink",
  props: {
    link: {
      type: String,
      required: false,
    },
    action: {
      type: Function,
      required: false,
    },
    dropdownItems: {
      type: Array,
      required: false,
    },
    dropdownClass: {
      type: String,
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
      :class="$attrs.class"
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
        class="absolute top-full left-1/2 transform -translate-x-1/2 min-w-[100%] z-10"
        :class="dropdownClass"
      >
        <div class="h-2" />
        <div class="grid bg-primary border py-2 border-white rounded-md z-10">
          <div v-for="(item, index) in dropdownItems" :key="index">
            <hr class="border-gray-300 my-2" v-if="item.separator === true" />
            <router-link
              :to="item.link ?? ''"
              @click="item.action"
              class="flex justify-around py-2 transition-all duration-300 eas e-in-out hover:font-semibold hover:bg-primary-light"
              v-else
            >
              <v-icon v-if="item.icon" :name="item.icon" :scale="item.scale" />
              <span v-if="item.label">{{ item.label }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
