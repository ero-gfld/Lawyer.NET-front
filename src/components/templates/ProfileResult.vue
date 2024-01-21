<script setup lang="ts">
import { defineProps } from "vue";
import LawyerSearchModel from "@/models/LawyerSearchModel";

import VButton from "@/components/atoms/VButton.vue";
import VLabel from "@/components/atoms/VLabel.vue";
import LawyerTimetable from "@/components/organisms/LawyerTimetable.vue";

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
  <div class="border border-gray-300 p-5">
    <div class="recap flex flex-row">
      <div class="pr-5">
        <img
          class="rounded-full"
          src="https://via.placeholder.com/150"
          alt="profile image"
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
        </div>
        <div class="flex flex-col">
          <v-button>{{ $t("profile.result.check-profile") }}</v-button>
        </div>
        <div class="flex flex-col">
          <v-label class="text-sm text-stone-500">{{
            props.profile.address
          }}</v-label>
          <v-label class="text-sm text-stone-500"
            >{{ props.profile.postalCode }} {{ props.profile.city }}</v-label
          >
        </div>
      </div>
    </div>
    <lawyer-timetable
      class="mt-5 px-10 py-3 border rounded-xl"
      :timetable="
        props.profile.availableSlots.timeslotsByDate.availabilityTimetable
      "
    />
  </div>
</template>
