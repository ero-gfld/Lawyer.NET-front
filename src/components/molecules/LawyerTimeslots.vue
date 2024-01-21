<script setup lang="ts">
import VButton from "@/components/atoms/VButton.vue";
import VLabel from "@/components/atoms/VLabel.vue";
import LawyerSearchModel from "@/models/LawyerSearchModel";
import { useAppointmentStore } from "@/stores/AppointmentStore";
import { parse, format } from "date-fns";
import { defineProps, ref } from "vue";

const props = defineProps<{
  lawyer: LawyerSearchModel;
  date: string;
  timeslots: string[];
}>();

const INITIAL_TIMESLOTS_SHOWN = 5;

const timeslotsShown = ref(INITIAL_TIMESLOTS_SHOWN);

const appointmentStore = useAppointmentStore();

function getDayOfWeek(date: string) {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  return format(parsedDate, "EEEE");
}

function getFullDay(date: string) {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  return format(parsedDate, "dd MMMM yyyy");
}

function showFullTimetable() {
  timeslotsShown.value = props.timeslots.length;
}

function getEmptySlots(timeslots: string[]) {
  if (timeslots.length < timeslotsShown.value) {
    return Array(timeslotsShown.value - timeslots.length).fill("--:--");
  }
}
</script>

<template>
  <div class="flex flex-col place-items-center">
    <v-label class="text-stone-500 font-semibold">{{
      getDayOfWeek(props.date)
    }}</v-label>
    <v-label class="text-sm">{{ getFullDay(props.date) }}</v-label>
    <div class="flex flex-col mt-4 gap-y-3">
      <div
        v-for="time in timeslots.slice(0, timeslotsShown)"
        :key="time"
        class="text-center"
      >
        <v-button
          button-type="timeslot"
          @click="
            appointmentStore.showAppointment(
              time,
              date,
              lawyer.id,
              `${lawyer.firstName} ${lawyer.lastName}`
            )
          "
        >
          {{ time }}
        </v-button>
      </div>
      <div v-for="empty in getEmptySlots(timeslots)" :key="empty">
        <div class="font-semibold text-gray-400 px-4 py-0.5">--:--</div>
      </div>
    </div>
    <div v-if="timeslots.length >= timeslotsShown" class="mt-2">
      <v-button
        v-if="timeslotsShown === INITIAL_TIMESLOTS_SHOWN"
        @click="showFullTimetable"
        button-type="link"
      >
        +{{ timeslots.length - timeslotsShown }}
      </v-button>
      <v-button
        v-else
        @click="timeslotsShown = INITIAL_TIMESLOTS_SHOWN"
        button-type="link"
        >Show less</v-button
      >
    </div>
  </div>
</template>
