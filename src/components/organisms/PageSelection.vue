<script setup lang="ts">
import VButton from "@/components/atoms/VButton.vue";
import { defineProps } from "vue";

const props = defineProps<{
  numberOfPages: number;
  currentPage: number;
  search: Function;
}>();

function isPageActive(page: number) {
  return page - 1 === props.currentPage;
}
</script>

<template>
  <div class="space-x-3">
    <v-button
      button-type="icon"
      @click="search(currentPage - 1)"
      :disabled="currentPage <= 0"
    >
      <v-icon name="la-angle-left-solid" />
    </v-button>
    <v-button
      v-for="page in numberOfPages"
      :key="page"
      :disabled="isPageActive(page)"
      @click="search(page - 1)"
    >
      {{ `Page ${page}` }}
    </v-button>
    <v-button
      button-type="icon"
      @click="search(currentPage + 1)"
      :disabled="currentPage + 1 >= numberOfPages"
    >
      <v-icon name="la-angle-right-solid" />
    </v-button>
  </div>
</template>
