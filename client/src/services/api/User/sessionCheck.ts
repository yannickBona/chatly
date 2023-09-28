import { makeAuthorizedRequest } from "../makeRequest";

export const checkSession = async () => {
  return makeAuthorizedRequest({
    url: "/user/session",
  });
};
