import {
  HttpSuccessResponse,
  HttpErrorResponse,
  HttpResponseStatus,
  HttpResponse,
} from "@/models/HttpResponses/HttpResponse";
import TokenResponse from "@/models/TokenResponse";
import apiConfig from "@/config/api-config.json";
import axios from "axios";
import { UserModel } from "@/models/UserModel";

export async function postLogin(
  username: string,
  password: string
): Promise<HttpResponse<TokenResponse>> {
  const response = await axios
    .post(`${apiConfig.URL}/auth/login`, {
      username,
      password,
    })
    .then((res) => {
      return {
        status: res.status,
        data: res.data,
        details: "Successfully logged in.",
      } as HttpSuccessResponse<TokenResponse>;
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.message,
        details: HttpResponseStatus.UNAUTHORIZED
          ? "Invalid username or password."
          : "Couldn't login.",
      } as HttpErrorResponse;
    });
  return response;
}

export async function getUser(
  userId: string,
  token: string
): Promise<HttpResponse<UserModel>> {
  const response = await axios
    .get(`${apiConfig.URL}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return {
        status: res.status,
        data: res.data,
        details: "Successfully retrieved user.",
      } as HttpSuccessResponse<UserModel>;
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.message,
        details: "Couldn't retrieve user.",
      } as HttpErrorResponse;
    });
  return response;
}
