<script setup lang="ts">
import { MOCK_LAWYERS } from "@/assets/Mockup";
import ProfileResult from "@/components/organisms/ProfileResult.vue";
import { OhVueIcon } from "oh-vue-icons";

const profiles = MOCK_LAWYERS;
</script>

<template>
  <div class="mx-60">
    <div class="my-5">
      <OhVueIcon name="hi-solid-search" />
      {{ $t("profile.result.count", { count: profiles.length }) }}
    </div>
    <div class="grid gap-y-5 mb-5">
      <ProfileResult
        v-for="profile in profiles"
        :key="profile.id"
        :profile="profile"
      />
    </div>
  </div>
</template>
@/assets/Mockup
