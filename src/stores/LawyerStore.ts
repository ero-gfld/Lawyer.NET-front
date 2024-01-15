import { defineStore } from "pinia";
import router from "@/router";
import axios from "axios";
import apiConfig from "@/config/api-config.json";
import UserModel from "@/models/UserModel";
import ModifiedUserModel from "@/models/ModifiedUserModel";
import RegistrationUserModel from "@/models/RegistrationUserModel";
import { LawyerResultModel } from "@/models/LawyerResultModel";
import {
  deleteLawyers,
  getLawyers,
  postLawyers,
  putLawyers,
} from "@/services/LawyerService";
import {
  photoUpload,
  getPhoto,
} from "@/services/PhotoService";
import { useErrorStore } from "@/stores/ErrorStore";
import {
  HttpErrorResponse,
  HttpSuccessResponse,
  isHttpSuccessResponse,
} from "@/models/HttpResponses/HttpResponse";
import { string } from "yup";

const getAuthToken = () => localStorage.getItem("access_token");


export const useLawyerStore = defineStore("lawyerStore", {
    state: () => ({
      lawyersInfo: null,
      lawyers: [] as LawyerResultModel[],
    }),
    actions: {
      async fetchLawyers() {
        const token = localStorage.getItem("access_token");
        if (token) {
          const response = await getLawyers(token);
          if (isHttpSuccessResponse(response)) {
            const success = response as HttpSuccessResponse<LawyerResultModel[]>;
            this.lawyers = success.data;
            return;
          }
          const error = response as HttpErrorResponse;
          useErrorStore().showError(error.message, error.details);
        }
      },
  
      async createLawyer(lawyerData: LawyerResultModel) {
        const token = localStorage.getItem("access_token");
        if (token){
        const response = await postLawyers(lawyerData, token);
        if (isHttpSuccessResponse(response)) {
          
          
          return;
        }
        const error = response as HttpErrorResponse;
        useErrorStore().showError(error.message, error.details);
      }
      },
  
      async updateLawyer(lawyerId: string, updatedData: LawyerResultModel) {
        const token = localStorage.getItem("access_token");
        if (token) {
          const response = await putLawyers(lawyerId, updatedData, token);
          if (isHttpSuccessResponse(response)) {
            const success = response as HttpSuccessResponse<LawyerResultModel>;
            const index = this.lawyers.findIndex((lawyers) => lawyers.id === lawyerId);
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
            const index = this.lawyers.findIndex((lawyers) => lawyers.id === lawyerId);
            this.lawyers.splice(index, 1);
            return;
          }
          const error = response as HttpErrorResponse;
          useErrorStore().showError(error.message, error.details);
        }
      },

      async uploadPhoto(file: File, bucketName: string, objectName: string, uuid: string){
        const token = localStorage.getItem("access_token");
        if (token) {
          const response = await photoUpload(file, bucketName, objectName, token, uuid);
          if (isHttpSuccessResponse(response)) {
            return;
          }
          const error = response as HttpErrorResponse;
          useErrorStore().showError(error.message, error.details);
        }
        
      },


      async getFile(photoBucket: string, photoName:string, id: string) {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.error('No access token available');
          return null; // or a default image path
        }
      
        return await getPhoto(photoBucket, photoName, token, id);
      },
      

     


    },
  });
  