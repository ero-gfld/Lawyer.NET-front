<script setup lang="ts">
import { defineProps } from "vue";
import LawyerSearchModel from "@/models/LawyerSearchModel";
import LawyerTimetable from "@/components/organisms/LawyerTimetable.vue";
import LawyerInformation from "@/components/organisms/LawyerInformation.vue";

const props = defineProps<{
  profile: LawyerSearchModel;
}>();
</script>

<template>
  <div class="border border-gray-300 p-5">
    <lawyer-information :profile="props.profile" />
    <lawyer-timetable
      class="mt-5 px-10 py-3 border rounded-xl"
      :lawyer="props.profile"
      :timetable="
        props.profile.availableSlots.timeslotsByDate.availabilityTimetable
      "
    />
  </div>
</template>
