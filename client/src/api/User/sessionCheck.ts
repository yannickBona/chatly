import { makeRequest } from "../makeRequest";

export const checkSession = async (token: string) => {
  return makeRequest({
    url: "/user/session",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
