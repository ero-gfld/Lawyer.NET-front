<script setup lang="ts">
import { parse, format } from "date-fns";
import { defineProps } from "vue";
import LawyerSearchModel from "@/models/LawyerSearchModel";

import VButton from "@/components/atoms/VButton.vue";
import VLabel from "@/components/atoms/VLabel.vue";

const props = defineProps<{
  profile: LawyerSearchModel;
}>();

function getDayOfWeek(date: string) {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  return format(parsedDate, "EEEE");
}

function getFullDay(date: string) {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  return format(parsedDate, "dd MMMM yyyy");
}

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
  <div class="profile border p-5">
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
    <div
      class="mt-5 flex flex-row justify-between border rounded-lg px-10 py-3"
    >
      <div
        v-for="[date, timeslots] in Object.entries(
          props.profile.availableSlots.timeslotsByDate.availabilityTimetable
        )"
        :key="date"
      >
        <div class="flex flex-col place-items-center">
          <v-label class="text-stone-500">{{ getDayOfWeek(date) }}</v-label>
          <v-label>{{ getFullDay(date) }}</v-label>
          <div class="flex flex-col mt-4 gap-y-3">
            <div
              v-for="time in timeslots.slice(0, 5)"
              :key="time"
              class="text-primary font-semibold bg-primary-lightest border-2 border-primary-lighter rounded-lg px-4"
            >
              {{ time }}
            </div>
          </div>
          <div v-if="timeslots.length > 5" class="mt-2">
            <v-label class="text-stone-500 mt-4">
              +{{ timeslots.length - 5 }}
            </v-label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
