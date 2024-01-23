<script setup lang="ts">
import SimpleAppointment from "@/dtos/appointments/SimpleAppointment";
import VButton from "@/components/atoms/VButton.vue";
import { defineProps } from "vue";
const props = defineProps<{
  appointment: SimpleAppointment;
  deleteAppointment: () => void;
}>();
</script>

<template>
  <div class="flex justify-between py-2">
    <div>
      <p class="text-lg">{{ props.appointment.lawyerName }}</p>
    </div>
    <div class="flex flex-right gap-x-3">
      <div class="text-right">
        <p class="text-sm">{{ props.appointment.date }}</p>
        <p class="text-sm">{{ props.appointment.time }}</p>
      </div>
      <v-button
        class="text-red-700 hover:text-red-500 active:text-red-300"
        button-type="icon"
        @click="deleteAppointment()"
      >
        <v-icon name="md-deleteforever" scale="1.25"
      /></v-button>
    </div>
  </div>
</template>
