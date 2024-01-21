<script setup lang="ts">
import LawyerSearchResult from "@/models/LawyerSearchResult";
import ProfileResult from "@/components/templates/ProfileResult.vue";
import PageSelection from "@/components/organisms/PageSelection.vue";
import NoLawyerFound from "@/components/organisms/NoLawyerFound.vue";
import { defineProps } from "vue";

const props = defineProps<{
  lawyerResult: LawyerSearchResult;
  search: Function;
}>();
</script>

<template>
  <div class="grid gap-y-5" v-if="props.lawyerResult.results.length > 0">
    <profile-result
      v-for="profile in props.lawyerResult.results"
      :key="profile.id"
      :profile="profile"
    />
    <page-selection
      class="justify-self-center"
      :number-of-pages="props.lawyerResult.totalPages"
      :current-page="props.lawyerResult.page"
      :search="props.search"
    />
  </div>
  <div class="flex justify-center items-center h-[calc(100vh-10rem)]" v-else>
    <no-lawyer-found />
  </div>
</template>
