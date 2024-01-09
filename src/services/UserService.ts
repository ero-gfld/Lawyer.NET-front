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

export async function postUser(
  user: RegistrationUserModel
): Promise<HttpResponse<UserModel>> {
  const response = await axios
    .post(`${apiConfig.URL}/api/users/new`, user)
    .then((res) => {
      return {
        status: res.status,
        data: res.data,
        details: "Successfully created user.",
      } as HttpSuccessResponse<UserModel>;
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.message,
        details:
          "Couldn't create user. Maybe your username or email is already taken",
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

export async function getUsers(token: string) {
  const response = await axios
    .get(`${apiConfig.URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const users = response.data as UserModel[];
      return {
        status: response.status,
        data: users,
        details: "Successfully retrieved users.",
      } as HttpSuccessResponse<UserModel[]>;
    })
    .catch((error) => {
      return {
        status: error.response.status,
        message: error.message,
        details: "Couldn't retrieve users.",
      } as HttpErrorResponse;
    });
  return response;
}

export async function putUser(
  userId: string,
  updatedUser: ModifiedUserModel,
  token: string
): Promise<HttpResponse<ModifiedUserModel>> {
  const response = await axios
    .put(`${apiConfig.URL}/api/users/${userId}`, updatedUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return {
        status: res.status,
        data: res.data,
        details: "Successfully updated user.",
      } as HttpSuccessResponse<ModifiedUserModel>;
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.message,
        details: "Couldn't update user.",
      } as HttpErrorResponse;
    });
  return response;
}

export async function deleteUser(
  userId: string,
  token: string
): Promise<HttpResponse<null>> {
  const response = await axios
    .delete(`${apiConfig.URL}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return {
        status: res.status,
        data: null,
        details: "Successfully deleted user.",
      } as HttpSuccessResponse<null>;
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.message,
        details: "Couldn't delete user.",
      } as HttpErrorResponse;
    });
  return response;
}
