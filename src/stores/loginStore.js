import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import apiConfig from "@/config/api-config.json";
import userRoles from "@/constants/user-roles.js";

export const useLoginStore = defineStore("loginStore", {
  state() {
    return {
      userInfo: null,
      userRole: null,
      isLogin: false,
      returnUrl: null,
    };
  },
  actions: {
    login(username, password) {
      console.log(username);
      axios
        .post(`${apiConfig.URL}/auth/login`, { username, password })
        .then((res) => {
          console.log(res);
          const token = res.data.token;
          const userId = res.data.id;
          localStorage.setItem("access_token", token);
          localStorage.setItem("access_id", userId);
          this.getUserInfo();
          router.push({ name: "Homepage" });
        });
    },
    logout() {
      localStorage.clear();
      this.isLogin = false;
      router.push({ name: "Homepage" });
    },
    getUserInfo() {
      const token = localStorage.getItem("access_token");
      const userId = localStorage.getItem("access_id");
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      if (token !== null) {
        axios
          .get(`${apiConfig.URL}/api/users/${userId}`, config)
          .then((res) => {
            console.log(res);
            this.userInfo = res.data.username;
            this.userRole = res.data.role;
            this.isLogin = true;
            router.push(this.returnUrl || "/");
          });
      }
    },
    hasJwtToken() {
      return localStorage.getItem("access_token") !== null;
    },
    isAdmin() {
      return this.userRole === userRoles.ADMIN;
    },
  },
});
