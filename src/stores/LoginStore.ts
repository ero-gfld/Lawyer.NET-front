import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import UserRoles from "@/constants/UserRoles";
import {
  HttpResponseStatus,
  HttpErrorResponse,
  HttpSuccessResponse,
  isHttpErrorResponse,
  isHttpSuccessResponse,
} from "@/models/HttpResponses/HttpResponse";
import { postLogin, getUser } from "@/services/UserService";
import { UserModel } from "@/models/UserModel";
import { useErrorStore } from "@/stores/ErrorStore";
import TokenResponse from "@/models/TokenResponse";

export const useLoginStore = defineStore("loginStore", {
  state() {
    return {
      user: null as UserModel | null,
      isLoggedIn: false,
    };
  },
  actions: {
    async login(username: string, password: string) {
      const response = await postLogin(username, password);
      if (isHttpSuccessResponse(response)) {
        const success = response as HttpSuccessResponse<TokenResponse>;
        localStorage.setItem("access_token", success.data.token);
        localStorage.setItem("access_id", success.data.id);
        this.fetchUser(success.data.token, success.data.id);
        router.push({ name: "Homepage" });
      }
      if (isHttpErrorResponse(response)) {
        const error = response as HttpErrorResponse;
        useErrorStore().showError(error.message, error.details);
      }
    },
    async fetchUser(token = "", userId = "") {
      token = token ?? localStorage.getItem("access_token");
      userId = userId ?? localStorage.getItem("access_id");
      if (token !== null && userId !== null) {
        const response = await getUser(userId, token);
        if (isHttpSuccessResponse(response)) {
          const success = response as HttpSuccessResponse<UserModel>;
          this.user = success.data;
          this.isLoggedIn = true;
        }
        localStorage.clear();
        this.user = null;
        this.isLoggedIn = false;
      }
    },
    logout() {
      localStorage.clear();
      this.user = null;
      this.isLoggedIn = false;
      router.push({ name: "Homepage" });
    },
    hasJwtToken() {
      return localStorage.getItem("access_token") !== null;
    },
    isAdmin() {
      return this.user?.role === UserRoles.ADMIN;
    },
  },
});
