import axios from "axios";
import apiConfig from "@/config/api-config.json";
import {
  HttpErrorResponse,
  HttpSuccessResponse,
} from "@/models/HttpResponses/HttpResponse";
import CreateAppointmentRequest from "@/models/CreateAppointmentRequest";

export async function createAppointment(
  lawyerId: string,
  userId: string,
  date: string,
  time: string,
  token: string
) {
  const appointmentRequest: CreateAppointmentRequest = {
    lawyerId,
    userId,
    date,
    time,
  };
  const response = await axios
    .post(`${apiConfig.URL}/appointments`, appointmentRequest, {
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
