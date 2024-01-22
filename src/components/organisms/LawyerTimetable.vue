<script setup lang="ts">
import { parse } from "date-fns";
import LawyerSearchModel from "@/models/LawyerSearchModel";
import LawyerTimeslots from "@/components/molecules/LawyerTimeslots.vue";
import VButton from "@/components/atoms/VButton.vue";
import { useAppointmentStore } from "@/stores/AppointmentStore";
import { ref, defineProps } from "vue";

const props = defineProps<{
  lawyer: LawyerSearchModel;
  timetable: [string, string[]];
}>();

const timetable = ref(props.timetable);
const currentTimetable = ref(0);
const timetablesCache = ref([timetable.value]);

const appointmentStore = useAppointmentStore();

async function nextPeriod() {
  if (timetablesCache.value[currentTimetable.value + 1]) {
    timetable.value = timetablesCache.value[currentTimetable.value + 1];
    currentTimetable.value++;
    return;
  }
  const date = parse(Object.keys(timetable.value)[0], "yyyy-MM-dd", new Date());
  date.setDate(date.getDate() + 8);
  const nextTimetable = await appointmentStore.getAvailabilityForPeriod(
    props.lawyer.id,
    date.toISOString().slice(0, 10),
    7
  );
  timetable.value = nextTimetable.availabilityTimetable;
  timetablesCache.value.push(nextTimetable.availabilityTimetable);
  currentTimetable.value++;
}
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
    <v-button @click="async () => nextPeriod()">NEXT</v-button>
  </div>
</template>
