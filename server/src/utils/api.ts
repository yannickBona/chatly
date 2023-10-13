import { Response } from "express";
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
  status: 200,
  statusText: "Ok",
  data: null,
};

export const HTTP_400_BAD_REQUEST = (res: Response, message: string) => {
  res
    .status(400)
    .json({ status: 400, statusText: "Bad request", details: message });
};

export const HTTP_401_UNAUHORIZED = {
  status: 401,
  statusText: "Unauthorized",
  details: null,
};

export const HTTP_403_FORBIDDEN = {
  status: 403,
  statusText: "Forbidden",
  details: null,
};

export const HTTP_404_NOT_FOUND = {
  status: 404,
  statusText: "Not found",
  details: null,
};

export const HTTP_500_INTERNAL_SERVER_ERROR = {
  status: 500,
  statusText: "Internal server error",
  details: null,
};
