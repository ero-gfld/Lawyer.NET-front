import {
  HttpSuccessResponse,
  HttpErrorResponse,
  HttpResponseStatus,
  HttpResponse,
} from "@/models/HttpResponses/HttpResponse";
import TokenResponse from "@/models/TokenResponse";
import apiConfig from "@/config/api-config.json";
import axios from "axios";
import BlogModel from "@/models/BlogModel";

export async function getLatestBlogs() {
  const response = await axios
    .get(`${apiConfig.URL}/api/blog/`)
    .then((response) => {
      const blogs = response.data as BlogModel[];
      return {
        status: response.status,
        data: blogs,
        details: "Successfully retrieved users.",
      } as HttpSuccessResponse<BlogModel[]>;
    })
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.message,
        details: "Couldn't retrieve blogs.",
      } as HttpErrorResponse;
    });
  return response;
}
