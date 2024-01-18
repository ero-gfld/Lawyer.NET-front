<script setup lang="ts">
import ProfileResult from "@/components/organisms/ProfileResult.vue";
import { LawyerSearchResult } from "@/models/LawyerSearchResult";
import { useSearchStore } from "@/stores/SearchStore";
import { OhVueIcon } from "oh-vue-icons";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const isLoading = ref(false);
const lawyerResult = ref<LawyerSearchResult>();

const route = useRoute();
const searchStore = useSearchStore();

function isPageActive(page: number) {
  if (!lawyerResult.value) {
    return false;
  }
  return page === lawyerResult.value.page + 1;
}

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
  <div class="mx-60">
    <div v-if="!isLoading && lawyerResult">
      <div class="my-5">
        <oh-vue-icon name="hi-solid-search" />
        {{
          $t("profile.result.count", {
            count: lawyerResult.results.length,
            searchTerm: route.params.search,
          })
        }}
      </div>
      <div class="grid gap-y-5 mb-5">
        <profile-result
          v-for="profile in lawyerResult.results"
          :key="profile.id"
          :profile="profile"
        />
      </div>
      <div class="flex justify-center gap-x-3 mb-5">
        <button
          @click="search(lawyerResult.page - 1)"
          :disabled="lawyerResult.page <= 0"
        >
          <oh-vue-icon name="la-angle-left-solid" />
        </button>
        <button
          v-for="page in lawyerResult.totalPages"
          :key="page"
          :disabled="isPageActive(page)"
          :class="isPageActive(page) ? 'text-gray-600 font-bold' : 'bg-white'"
          @click="search(page - 1)"
        >
          {{ `Page ${page}` }}
        </button>
        <button
          @click="search(lawyerResult.page + 1)"
          :disabled="lawyerResult.page + 1 >= lawyerResult.totalPages"
        >
          <oh-vue-icon name="la-angle-right-solid" />
        </button>
      </div>
    </div>
    <div v-else>
      <div class="my-5">
        <oh-vue-icon name="la-spinner-solid" class="animate-spin" />
        Searching for new lawyers...
      </div>
    </div>
  </div>
</template>
@/assets/Mockup
