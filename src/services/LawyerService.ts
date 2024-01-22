import {
  HttpSuccessResponse,
  HttpErrorResponse,
  HttpResponse,
} from "@/models/HttpResponses/HttpResponse";
import apiConfig from "@/config/api-config.json";
import axios from "axios";
import { LawyerModel } from "@/models/LawyerModel";
import { LawyerSearchResult } from "@/models/LawyerSearchResult";

export async function postLawyers(
  lawyer: LawyerModel,
  token: string
): Promise<HttpResponse<LawyerModel>> {
  const response = await axios
    .post(`${apiConfig.URL}/lawyers`, lawyer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    .then((res) => {
      return {
        status: res.status,
        data: res.data,
        details: "Successfully created lawyer.",
      } as HttpSuccessResponse<LawyerModel>;
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.message,
        details:
          "Couldn't create lawyer. Maybe your username or email is already taken",
      } as HttpErrorResponse;
    });
  return response;
}

export async function getLawyers(token: string) {
  const response = await axios
    .get(`${apiConfig.URL}/lawyers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const lawyers = response.data as LawyerModel[];
      return {
        status: response.status,
        data: lawyers,
        details: "Successfully retrieved lawyers.",
      } as HttpSuccessResponse<LawyerModel[]>;
    })
    .catch((error) => {
      return {
        status: error.response.status,
        message: error.message,
        details: "Couldn't retrieve lawyers.",
      } as HttpErrorResponse;
    });
  return response;
}

export async function putLawyers(
  lawyerId: string,
  updatedLawyer: LawyerModel,
  token: string
): Promise<HttpResponse<LawyerModel>> {
  const response = await axios
    .put(`${apiConfig.URL}/lawyers/${lawyerId}`, updatedLawyer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return {
        status: res.status,
        data: res.data,
        details: "Successfully updated lawyer.",
      } as HttpSuccessResponse<LawyerModel>;
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.message,
        details: "Couldn't update lawyer.",
      } as HttpErrorResponse;
    });
  return response;
}

export async function deleteLawyers(
  lawyerId: string,
  token: string
): Promise<HttpResponse<null>> {
  const response = await axios
    .delete(`${apiConfig.URL}/lawyers/${lawyerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return {
        status: res.status,
        data: null,
        details: "Successfully deleted lawyer.",
      } as HttpSuccessResponse<null>;
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.message,
        details: "Couldn't delete lawyer.",
      } as HttpErrorResponse;
    });
  return response;
}

export async function getLawyerResultBySearchTerm(
  searchTerm: string,
  page: number,
  size: number,
  token: string
): Promise<HttpResponse<LawyerSearchResult>> {
  const response = await axios
    .get(`${apiConfig.URL}/lawyers/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        searchTerm: searchTerm,
        page: page,
        size: size,
      },
    })
    .then((res) => {
      return {
        status: res.status,
        data: res.data,
        details: "Successfully retrieved lawyer.",
      } as HttpSuccessResponse<LawyerSearchResult>;
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.message,
        details: "Couldn't retrieve lawyer.",
      } as HttpErrorResponse;
    });
  return response;
}
