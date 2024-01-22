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
  <div class="border p-5 border-gray-300 space-y-4">
    <lawyer-information :profile="props.profile" />
    <lawyer-timetable
      class="p-4 border rounded-xl justify-between"
      :lawyer="props.profile"
      :timetable="
        props.profile.availableSlots.timeslotsByDate.availabilityTimetable
      "
    />
  </div>
</template>
