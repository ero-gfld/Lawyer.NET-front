<script setup lang="ts">
import NoAppointmentsMessage from "@/components/organisms/NoAppointmentsMessage.vue";
import SimpleAppointment from "@/dtos/appointments/SimpleAppointment";
import UserAppointment from "@/components/molecules/UserAppointment.vue";
import { useAppointmentStore } from "@/stores/AppointmentStore";
import { defineProps, onMounted, ref } from "vue";

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

const appointments = ref<SimpleAppointment[]>([]);

onMounted(async () => {
  appointments.value = (
    await useAppointmentStore().getAllAppointmentsForUser(props.userId)
  )
    .sort((a, b) => {
      return (
        new Date(a.date + " " + a.time).getTime() -
        new Date(b.date + " " + b.time).getTime()
      );
    })
    .filter((appointment) => {
      return new Date(appointment.date) > new Date();
    });
});
</script>

<template>
  <div>
    <no-appointments-message v-if="appointments.length <= 0" />
    <div class="divide-y">
      <user-appointment
        v-for="appointment in appointments"
        :key="appointment.id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>
