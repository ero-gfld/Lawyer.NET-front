import { defineStore } from "pinia";
import axios from "axios";
import apiConfig from "@/config/api-config.json";
import UserModel from "@/models/UserModel";
import ModifiedUserModel from "@/models/ModifiedUserModel";
import RegistrationUserModel from "@/models/RegistrationUserModel";
import {
  deleteUser,
  getUsers,
  postUser,
  putUser,
} from "@/services/UserService";
import { useErrorStore } from "@/stores/ErrorStore";
import {
  HttpErrorResponse,
  HttpSuccessResponse,
  isHttpSuccessResponse,
} from "@/models/HttpResponses/HttpResponse";

const getAuthToken = () => localStorage.getItem("access_token");

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userInfo: null,
    users: [] as UserModel[],
  }),
  actions: {
    async fetchUsers() {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await getUsers(token);
        if (isHttpSuccessResponse(response)) {
          const success = response as HttpSuccessResponse<UserModel[]>;
          this.users = success.data;
          return;
        }
        const error = response as HttpErrorResponse;
        useErrorStore().showError(error.message, error.details);
      }
    },

    async createUser(userData: RegistrationUserModel) {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await postUser(userData, token);
        if (isHttpSuccessResponse(response)) {
          const success = response as HttpSuccessResponse<UserModel>;
          this.users.push(success.data);
          return;
        }
        const error = response as HttpErrorResponse;
        useErrorStore().showError(error.message, error.details);
      }
    },

    async updateUser(userId: string, updatedData: ModifiedUserModel) {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await putUser(userId, updatedData, token);
        if (isHttpSuccessResponse(response)) {
          const success = response as HttpSuccessResponse<UserModel>;
          const index = this.users.findIndex((user) => user.id === userId);
          this.users[index] = success.data;
          return;
        }
        const error = response as HttpErrorResponse;
        useErrorStore().showError(error.message, error.details);
      }
    },

    async deleteUser(userId: string) {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await deleteUser(userId, token);
        if (isHttpSuccessResponse(response)) {
          const index = this.users.findIndex((user) => user.id === userId);
          this.users.splice(index, 1);
          return;
        }
        const error = response as HttpErrorResponse;
        useErrorStore().showError(error.message, error.details);
      }
    },
  },
});
