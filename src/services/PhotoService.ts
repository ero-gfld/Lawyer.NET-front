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


export async function photoUpload(
    file: File,
    bucketName: string,
    objectName: string,
    token: string
  ): Promise<HttpResponse<null>> {
    // Create a FormData instance to hold the file and other form data
    const formData = new FormData();
    formData.append('file', file); // 'file' is the key expected by the Spring controller
    formData.append('bucketName', bucketName); // 'bucketName' as expected by the Spring controller
    formData.append('objectName', objectName); // 'objectName' as expected by the Spring controller
  
   
    const response = await axios.post(`${apiConfig.URL}/api/files/upload`, formData, {
        headers: {
          // 'Content-Type' is not set because it's automatically set by the browser
          // when dealing with FormData, which includes the necessary boundary parameter
          Authorization: `Bearer ${token}`,
        },
      })
  
      .then((res) => {
        return {
          status: res.status,
          data: null,
          details: "Successfully uploaded photo.",
        } as HttpSuccessResponse<null>;
      })
      .catch((err) => {
        return {
          status: err.response.status,
          message: err.message,
          details: "Couldn't upload photo.",
        } as HttpErrorResponse;
      });
    return response;
  }
  
  export async function getPhoto(photoBucket: string, photoName: string, token: string) {
    try {
      const response = await axios.get(`${apiConfig.URL}/api/files/download/image/${photoBucket}/${photoName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob' // Important: This tells axios to handle the response as a Blob
      });
  
      if (response.data) {
        return URL.createObjectURL(response.data); // Converts blob to a URL
      }
    } catch (error) {
      console.error('Error fetching file:', error);
      // Handle the error appropriately
      return null; // or a default image path
    }
  }
  