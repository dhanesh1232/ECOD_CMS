import { NextResponse } from "next/server";

const headers = { "Content-Type": "application/json" };

// General helper to generate standardized error responses
const createErrorResponse = (status, message, success = false) => {
  return NextResponse.json({ success, message }, { status, headers });
};

export const ErrorHandles = {
  // 400 Bad Request
  BadRequest: async (message = "Bad request") => {
    return createErrorResponse(400, message);
  },

  // 401 Unauthorized
  UnauthorizedAccess: async (message = "Unauthorized access") => {
    return createErrorResponse(401, message);
  },

  // 403 Forbidden
  Forbidden: async (message = "Access forbidden") => {
    return createErrorResponse(403, message);
  },

  // 404 Not Found
  UserNotFound: async () => {
    return createErrorResponse(404, "User not found");
  },
  ResourceNotFound: async (message = "Requested resource not found") => {
    return createErrorResponse(404, message);
  },

  // 409 Conflict
  Conflict: async (message = "Conflict detected") => {
    return createErrorResponse(409, message);
  },

  // 422 Unprocessable Entity
  ValidationError: async (message = "Validation failed") => {
    return createErrorResponse(422, message);
  },

  // 429 Too Many Requests
  RateLimitExceeded: async () => {
    return createErrorResponse(
      429,
      "Too many requests. Please try again later."
    );
  },

  // 500 Internal Server Error
  InternalServer: async (message = "Internal server error") => {
    return createErrorResponse(500, message);
  },
};
