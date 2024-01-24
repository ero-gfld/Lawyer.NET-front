<script setup lang="ts">
import SimpleAppointment from "@/dtos/appointments/SimpleAppointment";
import VLabel from "@/components/atoms/VLabel.vue";
import UserAppointment from "@/components/molecules/UserAppointment.vue";
import { useAppointmentStore } from "@/stores/AppointmentStore";
import { defineProps, onMounted, ref } from "vue";

const props = defineProps({
  lawyerId: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: false,
  },
});

const appointments = ref<SimpleAppointment[]>([]);

async function deleteAppointment(id: string) {
  await useAppointmentStore().deleteAppointment(id, () => {
    appointments.value = appointments.value.filter((a) => a.id !== id);
  });
}

onMounted(async () => {
  appointments.value = await useAppointmentStore().getAllAppointmentsForLawyer(
    props.lawyerId,
    props.from
  );
});
</script>

<template>
  <div>
    <v-label v-if="appointments.length <= 0"
      >You have no appointments schedules for the moment.</v-label
    >
    <div class="divide-y">
      <user-appointment
        v-for="appointment in appointments"
        typeOfUser="lawyer"
        :delete-appointment="() => deleteAppointment(appointment.id)"
        :key="appointment.id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>
