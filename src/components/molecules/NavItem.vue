<script setup lang="ts">
import { OhVueIcon } from "oh-vue-icons";
import { defineProps, ref } from "vue";
import VButton from "@/components/atoms/VButton.vue";
import DropdownItemOptions from "@/models/DropdownItemOptions/DropdownItemOptions";
import DropdownItemType from "@/models/DropdownItemOptions/DropdownItemType";
import ButtonTypes from "@/constants/ButtonTypes";

const props = defineProps<{
  link?: string;
  dropdownItems?: DropdownItemOptions[];
  dropdownClass?: string;
}>();

const showDropdown = ref(false);

function toggleDropdown() {
  showDropdown.value = true;
}

function hideDropdown() {
  showDropdown.value = false;
}
</script>

<template>
  <div class="relative" @click="toggleDropdown" @mouseleave="hideDropdown">
    <router-link
      :to="props.link ?? ''"
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
        v-show="
          showDropdown && props.dropdownItems && props.dropdownItems.length > 0
        "
        class="absolute top-full left-1/2 transform -translate-x-1/2 min-w-[100%] z-10"
        :class="props.dropdownClass"
      >
        <div class="h-2" />
        <div class="grid bg-primary border py-2 border-white rounded-md z-10">
          <div v-for="(item, index) in props.dropdownItems" :key="index">
            <div v-if="item.type === DropdownItemType.Link">
              <router-link
                :to="item.link"
                class="flex justify-around py-2 transition-all duration-300 eas e-in-out hover:font-semibold hover:bg-primary-light"
              >
                <OhVueIcon v-if="item.icon" :name="item.icon" />
                <span v-if="item.label">{{ $t(item.label) }}</span>
              </router-link>
            </div>
            <div v-else-if="item.type === DropdownItemType.Action">
              <v-button
                @click="item.action"
                :type="ButtonTypes.NONE"
                class="flex justify-around rounded-none py-2 w-full transition-all duration-300 eas e-in-out hover:font-semibold hover:bg-primary-light"
              >
                <OhVueIcon v-if="item.icon" :name="item.icon" />
                <span v-if="item.label">{{ $t(item.label) }}</span>
              </v-button>
            </div>
            <div
              v-else-if="item.type === DropdownItemType.Separator"
              class="border-gray-300 border-b my-2"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
