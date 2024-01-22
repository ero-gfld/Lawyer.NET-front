import axios from "axios";
import apiConfig from "@/config/api-config.json";
import {
  HttpErrorResponse,
  HttpResponse,
  HttpSuccessResponse,
} from "@/models/HttpResponses/HttpResponse";
import CreateAppointmentRequest from "@/dtos/appointments/CreateAppointmentRequest";
import GetAppointmentTimeslotsRequest from "@/dtos/appointments/GetAppointmentTimeslotsRequest";
import { AvailabilityTimetable } from "@/models/AvailabilityTimetable";

export async function createAppointment(
  lawyerId: string,
  userId: string,
  date: string,
  time: string,
  token: string
) {
  const payload: CreateAppointmentRequest = {
    lawyerId,
    userId,
    date,
    time,
  };
  const response = await axios
    .post(`${apiConfig.URL}/appointments`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const appointment = response.data;
      return {
        status: response.status,
        data: appointment,
        details: "Successfully created appointment.",
      } as HttpSuccessResponse<any>;
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.message,
        details: "Couldn't create appointment.",
      } as HttpErrorResponse;
    });
  return response;
}

export async function getAvailabilityForPeriod(
  lawyerId: string,
  startDate: string,
  numberOfDays: string,
  token: string
): Promise<HttpResponse<AvailabilityTimetable>> {
  const payload: GetAppointmentTimeslotsRequest = {
    lawyerId,
    startDate,
    numberOfDays,
  };
  const response = await axios
    .get(`${apiConfig.URL}/appointments/available-timeslots`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: payload,
    })
    .then((response) => {
      const availability = response.data;
      return {
        status: response.status,
        data: availability,
        details: "Successfully retrieved availability.",
      } as HttpSuccessResponse<AvailabilityTimetable>;
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.message,
        details: "Couldn't retrieve availability.",
      } as HttpErrorResponse;
    });
  return response;
}
