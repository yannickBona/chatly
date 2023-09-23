import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Generates a new access token
 * @param user
 * @returns the token
 */
export function createAccessToken(user: JwtPayload) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);
}

/**
 * Status codes Handlers
 */

export const HTTP_200_OK = {
  statusCode: 200,
  statusText: "Ok",
  data: null,
};

export const HTTP_400_BAD_REQUEST = {
  statusCode: 400,
  statusText: "Bad request",
  details: null,
};

export const HTTP_401_UNAUHORIZED = {
  statusCode: 401,
  statusText: "Unauthorized",
  details: null,
};

export const HTTP_403_FORBIDDEN = {
  statusCode: 403,
  statusText: "Forbidden",
  details: null,
};

export const HTTP_404_NOT_FOUND = {
  statusCode: 404,
  statusText: "Not found",
  details: null,
};

export const HTTP_500_INTERNAL_SERVER_ERROR = {
  statusCode: 500,
  statusText: "Internal server error",
  details: null,
};
