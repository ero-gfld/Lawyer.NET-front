import HttpResponseStatus from "@/models/HttpResponses/HttpResponseStatus";

export type HttpErrorResponse = {
  status:
    | HttpResponseStatus.INTERNAL_SERVER_ERROR
    | HttpResponseStatus.BAD_REQUEST
    | HttpResponseStatus.UNAUTHORIZED
    | HttpResponseStatus.FORBIDDEN
    | HttpResponseStatus.NOT_FOUND;
  message: string;
  details?: string;
};

export type HttpSuccessResponse<T> = {
  status:
    | HttpResponseStatus.OK
    | HttpResponseStatus.CREATED
    | HttpResponseStatus.ACCEPTED;
  data: T;
  details?: string;
};

export type HttpResponse<T> = HttpSuccessResponse<T> | HttpErrorResponse;

const allHttpSuccessResponses: ReadonlyArray<HttpResponseStatus> = [
  HttpResponseStatus.OK,
  HttpResponseStatus.CREATED,
  HttpResponseStatus.ACCEPTED,
  HttpResponseStatus.NO_CONTENT,
];

const allHttpErrorResponses: ReadonlyArray<HttpResponseStatus> = [
  HttpResponseStatus.BAD_REQUEST,
  HttpResponseStatus.UNAUTHORIZED,
  HttpResponseStatus.FORBIDDEN,
  HttpResponseStatus.NOT_FOUND,
  HttpResponseStatus.INTERNAL_SERVER_ERROR,
];

export function isHttpSuccessResponse<T>(response: HttpResponse<T>): boolean {
  return allHttpSuccessResponses.includes(response.status);
}

export function isHttpErrorResponse<T>(response: HttpResponse<T>): boolean {
  return allHttpErrorResponses.includes(response.status);
}

export { HttpResponseStatus };
