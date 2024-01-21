<script setup lang="ts">
import LawyerTimeslots from "../molecules/LawyerTimeslots.vue";
import { ref, defineProps } from "vue";

const props = defineProps<{
  timetable: [string, string[]];
}>();

const timetable = ref(props.timetable);
</script>

<template>
  <div class="flex flex-row justify-between">
    <div v-for="[date, timeslots] in Object.entries(timetable)" :key="date">
      <lawyer-timeslots
        v-if="Array.isArray(timeslots)"
        :date="date"
        :timeslots="timeslots"
      />
    </div>
  </div>
</template>
