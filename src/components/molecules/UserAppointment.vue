<script setup lang="ts">
import SimpleAppointment from "@/dtos/appointments/SimpleAppointment";
import { defineProps } from "vue";
const props = defineProps<{
  appointment: SimpleAppointment;
}>();
</script>

<template>
  <div class="flex justify-between py-2">
    <div>
      <p class="text-lg">{{ props.appointment.lawyerName }}</p>
    </div>
    <div>
      <p class="text-sm">{{ props.appointment.date }}</p>
      <p class="text-sm">{{ props.appointment.time }}</p>
    </div>
  </div>
</template>
