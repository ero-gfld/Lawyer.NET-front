<script setup lang="ts">
import VLabel from "@/components/atoms/VLabel.vue";
import LawyerSearchModel from "@/models/LawyerSearchModel";
import { defineProps } from "vue";

const props = defineProps<{
  profile: LawyerSearchModel;
}>();

function formatSpecialization(str: string) {
  return str
    .replace(/_/g, " ")
    .replace(
      /(\w)(\w*)/g,
      (_, firstChar, restOfString) =>
        firstChar.toUpperCase() + restOfString.toLowerCase()
    );
}
</script>

<template>
  <div class="flex gap-x-5 items-center">
    <div>
      <img
        class="rounded-full"
        src="https://via.placeholder.com/100"
        :alt="`${props.profile.firstName} ${props.profile.lastName} profile picture`"
      />
    </div>
    <div class="flex flex-col justify-between">
      <div class="flex flex-col">
        <v-label class="text-primary font-bold text-lg -mb-1">{{
          `${props.profile.firstName} ${props.profile.lastName}`
        }}</v-label>
        <v-label class="text-md text-stone-700 font-medium">{{
          formatSpecialization(props.profile.specialization)
        }}</v-label>
        <v-label class="text-sm text-stone-500"
          >${{
            `${props.profile.hourlyRate} ${$t("profile.result.fees")}`
          }}</v-label
        >
        <v-label class="text-sm text-stone-500">{{
          props.profile.address
        }}</v-label>
        <v-label class="text-sm text-stone-500"
          >{{ props.profile.postalCode }} {{ props.profile.city }}</v-label
        >
      </div>
    </div>
  </div>
</template>
