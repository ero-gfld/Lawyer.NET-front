<script setup lang="ts">
import VLabel from "@/components/atoms/VLabel.vue";
</script>

<template>
  <div class="flex flex-col items-center">
    <v-label class="text-2xl font-semibold text-center">
      {{ $t("profile.result.no-results") }}
    </v-label>
    <v-label class="text-center text-gray-600">
      {{ $t("profile.result.no-results-description") }}
    </v-label>
  </div>
</template>
