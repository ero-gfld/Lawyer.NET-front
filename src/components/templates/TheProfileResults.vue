<script setup lang="ts">
import LawyerSearchResult from "@/models/LawyerSearchResult";
import ProfileResult from "@/components/organisms/ProfileResult.vue";
import { defineProps } from "vue";

const props = defineProps<{
  lawyerResult: LawyerSearchResult;
  search: Function;
}>();

function isPageActive(page: number) {
  if (!props.lawyerResult) {
    return false;
  }
  return page === props.lawyerResult.page + 1;
}
</script>

<template>
  <div>
    <div class="grid gap-y-5 mb-5">
      <profile-result
        v-for="profile in props.lawyerResult.results"
        :key="profile.id"
        :profile="profile"
      />
    </div>
    <div class="flex justify-center gap-x-3">
      <button
        @click="search(props.lawyerResult.page - 1)"
        :disabled="props.lawyerResult.page <= 0"
      >
        <v-icon name="la-angle-left-solid" />
      </button>
      <button
        v-for="page in props.lawyerResult.totalPages"
        :key="page"
        :disabled="isPageActive(page)"
        :class="isPageActive(page) ? 'text-gray-600 font-bold' : 'bg-white'"
        @click="search(page - 1)"
      >
        {{ `Page ${page}` }}
      </button>
      <button
        @click="search(props.lawyerResult.page + 1)"
        :disabled="props.lawyerResult.page + 1 >= props.lawyerResult.totalPages"
      >
        <v-icon name="la-angle-right-solid" />
      </button>
    </div>
  </div>
</template>
