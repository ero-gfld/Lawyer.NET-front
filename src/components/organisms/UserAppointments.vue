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
  appointments.value = await useAppointmentStore().getAllAppointmentsForUser(
    props.userId,
    props.from
  );
});
</script>

<template>
  <div>
    <no-appointments-message class="my-2" v-if="appointments.length <= 0" />
    <div class="divide-y">
      <user-appointment
        v-for="appointment in appointments"
        typeOfUser="user"
        :delete-appointment="() => deleteAppointment(appointment.id)"
        :key="appointment.id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>
