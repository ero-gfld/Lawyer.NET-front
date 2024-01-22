<script setup lang="ts">
import TheProfileResults from "@/components/templates/TheProfileResults.vue";
import { LawyerSearchResult } from "@/models/LawyerSearchResult";
import { useSearchStore } from "@/stores/SearchStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const isLoading = ref(false);
const lawyerResult = ref<LawyerSearchResult>();

const route = useRoute();
const searchStore = useSearchStore();

function search(page: number) {
  isLoading.value = true;
  searchStore.searchLawyers(route.params.search.toString(), page).then(() => {
    lawyerResult.value = searchStore.lawyerSearchResult;
    isLoading.value = false;
  });
}

onMounted(() => {
  search(0);
});
</script>

<template>
  <div class="flex justify-center my-6">
    <the-profile-results
      class="w-1/2"
      v-if="!isLoading && lawyerResult"
      :lawyerResult="lawyerResult"
      :search="search"
    />
    <div v-else>
      <v-icon name="la-spinner-solid" class="animate-spin" />
      Searching for new lawyers...
    </div>
  </div>
</template>
