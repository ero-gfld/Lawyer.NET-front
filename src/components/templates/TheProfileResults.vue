<script setup lang="ts">
import LawyerSearchResult from "@/models/LawyerSearchResult";
import ProfileResult from "@/components/organisms/ProfileResult.vue";
import PageSelection from "@/components/organisms/PageSelection.vue";
import { defineProps } from "vue";

const props = defineProps<{
  lawyerResult: LawyerSearchResult;
  search: Function;
}>();
</script>

<template>
  <div class="grid gap-y-5">
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
</template>
