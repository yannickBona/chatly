import { makeAuthorizedRequest, makeRequest } from "../makeRequest";

export const checkSession = async () => {
  return makeAuthorizedRequest({
    url: "/user/session",
  });
};

export const generateAccessToken = async () => {
  return makeRequest({
    url: "/user/token",
    withCredentials: true,
    method: "POST",
  });
};
