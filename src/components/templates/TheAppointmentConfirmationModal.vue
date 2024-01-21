<script setup lang="ts">
import VButton from "@/components/atoms/VButton.vue";
import { useAppointmentStore } from "@/stores/AppointmentStore";
const appointmentStore = useAppointmentStore();
</script>

<template>
  <div v-if="appointmentStore.isShown" class="fixed z-10 inset-0">
    <div class="fixed z-10 inset-0">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl transform transition-all sm:my-8 sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div class="text-center space-y-2">
              <h1 class="text-xl font-semibold text-gray-600">
                {{ $t("appointment-confirmation.title") }}
              </h1>
              <div>
                <p class="text-sm text-pretty">
                  {{
                    $t("appointment-confirmation.description", {
                      lawyerName: appointmentStore.lawyerDetails.name,
                      date: appointmentStore.appointmentDetails.date,
                      time: appointmentStore.appointmentDetails.time,
                    })
                  }}
                </p>
                <p class="text-sm font-semibold">
                  {{ $t("appointment-confirmation.proceed") }}
                </p>
              </div>
              <div class="space-x-3">
                <v-button>
                  {{ $t("appointment-confirmation.confirm") }}
                </v-button>
                <v-button
                  button-type="secondary"
                  @click="appointmentStore.closeModal()"
                >
                  {{ $t("appointment-confirmation.cancel") }}
                </v-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
