<script setup lang="ts">
import ProfileResult from "@/components/organisms/ProfileResult.vue";
import { OhVueIcon } from "oh-vue-icons";
import { ref } from "vue";
import { useLawyerStore } from "@/stores/LawyerStore";
import { useRoute } from "vue-router";

const page = ref(0);

const route = useRoute();

const lawyerStore = useLawyerStore();
lawyerStore.searchLawyers(route.params.search.toString(), page.value);
</script>

<template>
  <div class="mx-60">
    <div class="my-5">
      <oh-vue-icon name="hi-solid-search" />
      {{
        $t("profile.result.count", {
          count: lawyerStore.lawyerSearch.results.length,
          searchTerm: route.params.search,
        })
      }}
    </div>
    <div class="grid gap-y-5 mb-5">
      <profile-result
        v-for="profile in lawyerStore.lawyerSearch.results"
        :key="profile.id"
        :profile="profile"
      />
    </div>
  </div>
</template>
@/assets/Mockup
