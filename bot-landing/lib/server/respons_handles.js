import { NextResponse } from "next/server";
const headers = {
  "Content-Type": "application/json",
};
const ReturnResponse = (status, message, data) => {
  return NextResponse.json(
    { success: status >= 200 && status < 300, message, ...(data && { data }) },
    { status, headers }
  );
};

export const ErrorHandles = {
  BadRequest: (message = "Bad Request") => ReturnResponse(400, message),
  Unauthorized: (message = "Unauthorized") => ReturnResponse(401, message),
  Forbidden: (message = "Forbidden") => ReturnResponse(403, message),
  NotFound: (message = "Not Found") => ReturnResponse(404, message),
  Conflict: (message = "Conflict") => ReturnResponse(409, message),
  UnprocessableEntity: (message = "Unprocessable Entity") =>
    ReturnResponse(422, message),
  TooManyRequests: (message = "Too Many Requests") =>
    ReturnResponse(429, message),
  InternalServer: (message = "Internal Server Error") =>
    ReturnResponse(500, message),
  ServiceUnavailable: (message = "Service Unavailable") =>
    ReturnResponse(503, message),
};

export const SuccessHandles = {
  Ok: (message = "Success", data = null) => ReturnResponse(200, message, data),
  Created: (message = "Resource Created", data = null) =>
    ReturnResponse(201, message, data),
  Accepted: (message = "Accepted", data = null) =>
    ReturnResponse(202, message, data),
};
