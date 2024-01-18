import { defineStore } from "pinia";
import { LawyerModel } from "@/models/LawyerModel";
import {
  deleteLawyers,
  getLawyerResultBySearchTerm,
  getLawyers,
  postLawyers,
  putLawyers,
} from "@/services/LawyerService";
import { photoUpload, getPhoto } from "@/services/PhotoService";
import { useErrorStore } from "@/stores/ErrorStore";
import {
  HttpErrorResponse,
  HttpSuccessResponse,
  isHttpSuccessResponse,
} from "@/models/HttpResponses/HttpResponse";
import LawyerSearchResult from "@/models/LawyerSearchResult";

const getAuthToken = () => localStorage.getItem("access_token");

export const useLawyerStore = defineStore("lawyerStore", {
  state: () => ({
    lawyersInfo: null,
    lawyers: [] as LawyerModel[],
    lawyerSearch: {
      results: [],
      totalCount: 0,
      totalPages: 0,
      page: 0,
    } as LawyerSearchResult,
  }),
  actions: {
    async fetchLawyers() {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await getLawyers(token);
        if (isHttpSuccessResponse(response)) {
          const success = response as HttpSuccessResponse<LawyerModel[]>;
          this.lawyers = success.data;
          return;
        }
        const error = response as HttpErrorResponse;
        useErrorStore().showError(error.message, error.details);
      }
    },

    async createLawyer(lawyerData: LawyerModel) {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await postLawyers(lawyerData, token);
        if (isHttpSuccessResponse(response)) {
          return;
        }
        const error = response as HttpErrorResponse;
        useErrorStore().showError(error.message, error.details);
      }
    },

    async updateLawyer(lawyerId: string, updatedData: LawyerModel) {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await putLawyers(lawyerId, updatedData, token);
        if (isHttpSuccessResponse(response)) {
          const success = response as HttpSuccessResponse<LawyerModel>;
          const index = this.lawyers.findIndex(
            (lawyers) => lawyers.id === lawyerId
          );
          this.lawyers[index] = success.data;
          return;
        }
        const error = response as HttpErrorResponse;
        useErrorStore().showError(error.message, error.details);
      }
    },

    async deleteLawyer(lawyerId: string) {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await deleteLawyers(lawyerId, token);
        if (isHttpSuccessResponse(response)) {
          const index = this.lawyers.findIndex(
            (lawyers) => lawyers.id === lawyerId
          );
          this.lawyers.splice(index, 1);
          return;
        }
        const error = response as HttpErrorResponse;
        useErrorStore().showError(error.message, error.details);
      }
    },

    async uploadPhoto(
      file: File,
      bucketName: string,
      objectName: string,
      uuid: string
    ) {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await photoUpload(
          file,
          bucketName,
          objectName,
          token,
          uuid
        );
        if (isHttpSuccessResponse(response)) {
          return;
        }
        const error = response as HttpErrorResponse;
        useErrorStore().showError(error.message, error.details);
      }
    },

    async getFile(photoBucket: string, photoName: string, id: string) {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No access token available");
        return null; // or a default image path
      }

      return await getPhoto(photoBucket, photoName, token, id);
    },

    async searchLawyers(searchTerm: string, page: number) {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await getLawyerResultBySearchTerm(
          searchTerm,
          page,
          10,
          token
        );
        if (isHttpSuccessResponse(response)) {
          const success = response as HttpSuccessResponse<LawyerSearchResult>;
          this.lawyerSearch = success.data;
          return;
        }
        const error = response as HttpErrorResponse;
        useErrorStore().showError(error.message, error.details);
      }
    },
  },
});
