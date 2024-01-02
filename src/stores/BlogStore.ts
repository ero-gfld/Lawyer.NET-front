import { defineStore } from "pinia";
import UserModel from "@/models/UserModel";
import { useErrorStore } from "@/stores/ErrorStore";
import {
  HttpErrorResponse,
  HttpSuccessResponse,
  isHttpSuccessResponse,
} from "@/models/HttpResponses/HttpResponse";
import BlogModel from "@/models/BlogModel";
import { getLatestBlogs } from "@/services/BlogService";

export const useBlogStore = defineStore("blogStore", {
  state: () => ({
    blogs: [] as BlogModel[],
  }),

  actions: {
    async fetchLatestBlogs() {
      const response = await getLatestBlogs();
      if (isHttpSuccessResponse(response)) {
        const success = response as HttpSuccessResponse<BlogModel[]>;
        this.blogs = success.data;
        return;
      }
      const error = response as HttpErrorResponse;
      useErrorStore().showError(error.message, error.details);
    },
  },
});
