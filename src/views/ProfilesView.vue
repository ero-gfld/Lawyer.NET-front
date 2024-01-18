<script setup lang="ts">
import ProfileResult from "@/components/organisms/ProfileResult.vue";
import { LawyerSearchResult } from "@/models/LawyerSearchResult";
import { useSearchStore } from "@/stores/SearchStore";
import { OhVueIcon } from "oh-vue-icons";
import { ref } from "vue";
import { useRoute } from "vue-router";

const page = ref(0);
const isLoading = ref(true);

const route = useRoute();

const lawyerResult = ref<LawyerSearchResult>();

const searchStore = useSearchStore();
searchStore
  .searchLawyers(route.params.search.toString(), page.value)
  .then(() => {
    lawyerResult.value = searchStore.lawyerSearchResult;
    isLoading.value = false;
  });

function isPageActive(page: number) {
  if (!lawyerResult.value) {
    return false;
  }
  return page === lawyerResult.value.page + 1;
}
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
        <button :disabled="page <= 0">
          <oh-vue-icon name="la-angle-left-solid" />
        </button>
        <button
          v-for="page in lawyerResult.totalPages"
          :key="page"
          :disabled="isPageActive(page)"
          :class="isPageActive(page) ? 'text-gray-600' : 'bg-white'"
          @click="() => {}"
        >
          {{ `Page ${page}` }}
        </button>
        <button :disabled="page + 2 > lawyerResult.totalPages">
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
