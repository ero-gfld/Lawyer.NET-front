<script>
import ProfileResult from "../components/molecules/ProfileResult.vue";
import { OhVueIcon } from "oh-vue-icons";
import { Lawyer } from "../models/lawyer.js";

export default {
  name: "ProfilesView",
  data() {
    return {
      profiles: [
        new Lawyer(
          "John Doe",
          "Corporate Law",
          300,
          "New York",
          "123 Main St",
          "10001"
        ),
        new Lawyer(
          "Jane Smith",
          "Criminal Law",
          250,
          "Los Angeles",
          "456 Elm St",
          "90001"
        ),
        new Lawyer(
          "Bob Johnson",
          "Family Law",
          185,
          "Chicago",
          "789 Oak St",
          "60601"
        ),
        new Lawyer(
          "Alice Lee",
          "Immigration Law",
          500,
          "San Francisco",
          "321 Pine St",
          "94101"
        ),
      ],
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
      There is <b>{{ profiles.length }} results</b> for your search.
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
