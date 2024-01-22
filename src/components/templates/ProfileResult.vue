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
  <div class="border border-gray-300 p-5 space-y-4">
    <lawyer-information :profile="props.profile" />
    <lawyer-timetable
      class="justify-between ml-5 p-4 border rounded-xl"
      :lawyer="props.profile"
      :timetable="
        props.profile.availableSlots.timeslotsByDate.availabilityTimetable
      "
    />
  </div>
</template>
