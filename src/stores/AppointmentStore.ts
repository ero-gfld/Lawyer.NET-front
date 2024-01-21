import { defineStore } from "pinia";

export const useAppointmentStore = defineStore("appointmentStore", {
  state: () => ({
    appointmentDetails: {
      time: "",
      date: "",
    },
    lawyerDetails: {
      id: "",
      name: "",
    },
    isShown: false,
  }),
  actions: {
    closeModal() {
      this.appointmentDetails.time = "";
      this.appointmentDetails.date = "";
      this.lawyerDetails.id = "";
      this.lawyerDetails.name = "";
      this.isShown = false;
    },
    showAppointment(
      time: string,
      date: string,
      lawyerId: string,
      lawyerName: string
    ) {
      this.appointmentDetails.time = time;
      this.appointmentDetails.date = date;
      this.lawyerDetails.id = lawyerId;
      this.lawyerDetails.name = lawyerName;
      this.isShown = true;
    },
    confirmAppointment() {
      this.closeModal();
    },
  },
});
