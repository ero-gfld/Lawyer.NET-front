<script setup lang="ts">
import LawyerSearchModel from "@/models/LawyerSearchModel";
import LawyerTimeslots from "../molecules/LawyerTimeslots.vue";
import { ref, defineProps } from "vue";

const props = defineProps<{
  lawyer: LawyerSearchModel;
  timetable: [string, string[]];
}>();

const timetable = ref(props.timetable);
</script>

<template>
  <div class="flex">
    <div v-for="[date, timeslots] in Object.entries(timetable)" :key="date">
      <lawyer-timeslots
        v-if="Array.isArray(timeslots)"
        :date="date"
        :timeslots="timeslots"
        :lawyer="lawyer"
      />
    </div>
  </div>
</template>
