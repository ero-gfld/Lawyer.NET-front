import {
    HttpSuccessResponse,
    HttpErrorResponse,
    HttpResponseStatus,
    HttpResponse,
  } from "@/models/HttpResponses/HttpResponse";
  import TokenResponse from "@/models/TokenResponse";
  import apiConfig from "@/config/api-config.json";
  import axios from "axios";
  import UserModel from "@/models/UserModel";
  import ModifiedUserModel from "@/models/ModifiedUserModel";
  import RegistrationUserModel from "@/models/RegistrationUserModel";
  import { LawyerResultModel } from "@/models/LawyerResultModel";

  
  export async function postLawyers(
    lawyer: LawyerResultModel
  ): Promise<HttpResponse<LawyerResultModel>> {
    const response = await axios
      .post(`${apiConfig.URL}/lawyers`, lawyer)
      .then((res) => {
        return {
          status: res.status,
          data: res.data,
          details: "Successfully created lawyer.",
        } as HttpSuccessResponse<LawyerResultModel>;
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
        const lawyers = response.data as LawyerResultModel[];
        return {
          status: response.status,
          data: lawyers,
          details: "Successfully retrieved lawyers.",
        } as HttpSuccessResponse<LawyerResultModel[]>;
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
    updatedLawyer: LawyerResultModel,
    token: string
  ): Promise<HttpResponse<LawyerResultModel>> {
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
        } as HttpSuccessResponse<LawyerResultModel>;
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

 