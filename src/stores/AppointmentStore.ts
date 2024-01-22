import { defineStore } from "pinia";
import { createAppointment } from "@/services/AppointmentService";
import { useLoginStore } from "@/stores/LoginStore";
import { useNotificationStore } from "@/stores/NotificationStore";
import NotificationTypes from "@/constants/NotificationTypes";
import { useErrorStore } from "./ErrorStore";
import { AvailabilityTimetable } from "@/models/AvailabilityTimetable";
import { getAvailabilityForPeriod } from "@/services/AppointmentService";

const getAuthToken = () => localStorage.getItem("access_token");

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
    callback: (isAppointmentBooked: boolean) => {},
  }),
  actions: {
    closeModal() {
      this.isShown = false;
    },
    clearStates() {
      this.appointmentDetails.time = "";
      this.appointmentDetails.date = "";
      this.lawyerDetails.id = "";
      this.lawyerDetails.name = "";
      this.isShown = false;
      this.callback = (isAppointmentBooked: boolean) => {};
    },
    showAppointment(
      time: string,
      date: string,
      lawyerId: string,
      lawyerName: string,
      callback: (isAppointmentBooked: boolean) => void
    ) {
      this.appointmentDetails.time = time;
      this.appointmentDetails.date = date;
      this.lawyerDetails.id = lawyerId;
      this.lawyerDetails.name = lawyerName;
      this.isShown = true;
      this.callback = callback;
    },
    async confirmAppointment(): Promise<boolean> {
      let isBooked = false;
      const user = useLoginStore().user;
      const token = getAuthToken();
      if (user && user["id"] && token) {
        const response = await createAppointment(
          this.lawyerDetails.id,
          user.id,
          this.appointmentDetails.date,
          this.appointmentDetails.time,
          token
        );
        this.closeModal();
        if (response.status === 200) {
          useNotificationStore().generateNotification(
            "Appointment booked",
            "Appointment created successfully.",
            NotificationTypes.SUCCESS
          );
          isBooked = true;
        } else {
          useErrorStore().showError(
            "Couldn't create appointment.",
            response.details
          );
        }
      } else {
        useErrorStore().showError(
          "Couldn't create appointment.",
          "Invalid token or user data incorrect."
        );
      }
      this.callback(isBooked);
      return isBooked;
    },
    async getAvailabilityForPeriod(
      lawyerId: string,
      date: string,
      numberOfDays: number
    ): Promise<AvailabilityTimetable> {
      const token = getAuthToken();
      const defaultResponse: AvailabilityTimetable = {
        availabilityTimetable: ["", []],
      };
      if (token) {
        const response = await getAvailabilityForPeriod(
          lawyerId,
          date,
          numberOfDays.toString(),
          token
        );
        if (response.status === 200) {
          return response.data;
        }
        useErrorStore().showError(
          "Couldn't get the timetable.",
          response.details
        );
        return defaultResponse;
      }
      useErrorStore().showError(
        "Couldn't get the timetable.",
        "Invalid token."
      );
      return defaultResponse;
    },
  },
});
