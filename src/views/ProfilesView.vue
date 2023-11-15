<script>
import { mockData } from "@/assets/mockup";
import ProfileResult from "../components/molecules/ProfileResult.vue";
import { OhVueIcon } from "oh-vue-icons";

export default {
  name: "ProfilesView",
  data() {
    return {
      profiles: mockData.lawyerResults,
    };
  },
  components: {
    ProfileResult,
    "v-icon": OhVueIcon,
  },
};
</script>

<template>
  <div class="mx-60">
    <div class="my-5">
      <v-icon name="hi-solid-search" />
      {{ this.$t("profile.result.count", { count: profiles.length }) }}
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
