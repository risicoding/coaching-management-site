import { z } from "zod";
import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

const errorCodes = {
  UNAUTHORIZED: {
    statusCode: 401,
    message: "Unauthorized access. Please provide valid credentials.",
  },
  FORBIDDEN: {
    statusCode: 403,
    message: "Forbidden. You do not have permission to access this resource.",
  },
  NOT_FOUND: {
    statusCode: 404,
    message: "Not Found. The requested resource could not be found.",
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: "Internal Server Error. Something went wrong on our end.",
  },
  BAD_REQUEST: {
    statusCode: 400,
    message: "Bad Request. The server could not understand the request.",
  },
  UNPROCESSABLE_ENTITY: {
    statusCode: 422,
    message:
      "Unprocessable Entity. The server understands the content type but was unable to process the request.",
  },
  SERVICE_UNAVAILABLE: {
    statusCode: 503,
    message:
      "Service Unavailable. The server is currently unable to handle the request.",
  },
  CONFLICT: {
    statusCode: 409,
    message:
      "Conflict. The request could not be completed due to a conflict with the current state of the resource.",
  },
  GONE: {
    statusCode: 410,
    message:
      "Gone. The resource is no longer available and will not be available again.",
  },
  METHOD_NOT_ALLOWED: {
    statusCode: 405,
    message:
      "Method Not Allowed. The HTTP method used is not allowed for the requested resource.",
  },
  NOT_ACCEPTABLE: {
    statusCode: 406,
    message:
      "Not Acceptable. The server cannot generate a response that is acceptable to the client.",
  },
  REQUEST_TIMEOUT: {
    statusCode: 408,
    message: "Request Timeout. The server timed out waiting for the request.",
  },
  PRECONDITION_FAILED: {
    statusCode: 412,
    message:
      "Precondition Failed. A condition specified in the request headers was not met.",
  },
  TOO_MANY_REQUESTS: {
    statusCode: 429,
    message:
      "Too Many Requests. You have sent too many requests in a given amount of time.",
  },
  BAD_GATEWAY: {
    statusCode: 502,
    message:
      "Bad Gateway. The server received an invalid response from an upstream server.",
  },
  NOT_IMPLEMENTED: {
    statusCode: 501,
    message:
      "Not Implemented. The server does not support the functionality required to fulfill the request.",
  },
};

export const honoError = (
  code: keyof typeof errorCodes,
  c: Context,
  error?: any,
) => {
  const err = errorCodes[code];

  const isErr = error instanceof Error;

  if (!isErr) return;

  if (!err) {
    return c.json(
      {
        error: error?.message || "Unknown error",
        message: "An unknown error occurred.",
        code: "UNKNOWN",
      },
      500,
    );
  }

  return c.json(
    {
      error: error?.message || "An error occurred",
      message: err.message,
      code,
    },
    err.statusCode as ContentfulStatusCode,
  );
};

export const honoErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  code: z.number(),
});
