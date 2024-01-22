<script setup lang="ts">
import { parse } from "date-fns";
import LawyerSearchModel from "@/models/LawyerSearchModel";
import LawyerTimeslots from "@/components/molecules/LawyerTimeslots.vue";
import VButton from "@/components/atoms/VButton.vue";
import VLabel from "@/components/atoms/VLabel.vue";
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

function hasAnyTimeslotsAvailable() {
  for (const timeslots of Object.values(timetable.value)) {
    if (Array.isArray(timeslots) && timeslots.length > 0) {
      return true;
    }
  }
  return false;
}

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

function previousPeriod() {
  if (timetablesCache.value[currentTimetable.value - 1]) {
    timetable.value = timetablesCache.value[currentTimetable.value - 1];
    currentTimetable.value--;
  }
}
</script>

<template>
  <div class="flex">
    <v-button
      @click="async () => previousPeriod()"
      button-type="icon"
      :disabled="currentTimetable <= 0"
      ><v-icon name="la-angle-left-solid" scale="1.5"
    /></v-button>
    <div class="flex relative">
      <div v-for="[date, timeslots] in Object.entries(timetable)" :key="date">
        <lawyer-timeslots
          class="w-32"
          v-if="Array.isArray(timeslots)"
          :date="date"
          :timeslots="timeslots"
          :lawyer="lawyer"
        />
      </div>
      <div class="absolute inset-0 h-full" v-if="!hasAnyTimeslotsAvailable()">
        <div
          class="flex flex-col bg-primary-lightest bg-opacity-60 rounded-xl items-center h-full justify-center shadow-lg"
        >
          <v-icon name="bi-calendar2-x-fill" scale="2" />
          <v-label class="text-xl">{{
            $t("timetable.is-empty.title")
          }}</v-label>
          <v-label class="text-gray-600">{{
            $t("timetable.is-empty.description")
          }}</v-label>
        </div>
      </div>
    </div>
    <v-button @click="async () => nextPeriod()" button-type="icon">
      <v-icon name="la-angle-right-solid" scale="1.5" />
    </v-button>
  </div>
</template>
