<script setup lang="ts">
import { parse, format } from "date-fns";
import { ref, defineProps } from "vue";
import VButton from "@/components/atoms/VButton.vue";
import VLabel from "@/components/atoms/VLabel.vue";

const EMPTY_TIMESLOT = "--:--";

const props = defineProps<{
  timetable: [string, string[]];
}>();

const timetable = ref(props.timetable);

function getDayOfWeek(date: string) {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  return format(parsedDate, "EEEE");
}

function getFullDay(date: string) {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  return format(parsedDate, "dd MMMM yyyy");
}

function filledTimetable(): [string, string[]] {
  const newTimetable = timetable.value;
  for (const [date, timeslots] of Object.entries(newTimetable)) {
    console.log(date);
    if (typeof timeslots === "string") {
      break;
    }
    for (let i = timeslots.length; i < 5; i++) {
      timeslots.push(EMPTY_TIMESLOT);
    }
  }
  return newTimetable;
}
</script>

<template>
  <div class="flex flex-row justify-between">
    <div
      v-for="[date, timeslots] in Object.entries(filledTimetable())"
      :key="date"
    >
      <div class="flex flex-col place-items-center">
        <v-label class="text-stone-500 font-semibold">{{
          getDayOfWeek(date)
        }}</v-label>
        <v-label class="text-sm">{{ getFullDay(date) }}</v-label>
        <div class="flex flex-col mt-4 gap-y-3">
          <div
            v-for="time in timeslots.slice(0, 5)"
            :key="time"
            class="text-center"
          >
            <v-button button-type="timeslot" v-if="time !== EMPTY_TIMESLOT">
              {{ time }}
            </v-button>
            <span v-else class="font-semibold text-gray-400">
              {{ time }}
            </span>
          </div>
        </div>
        <div v-if="timeslots.length > 5" class="mt-2">
          <v-label class="text-stone-500">
            +{{ timeslots.length - 5 }}
          </v-label>
        </div>
      </div>
    </div>
  </div>
</template>
