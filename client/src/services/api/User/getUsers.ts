import { makeAuthorizedRequest } from "../makeRequest";

export const getUsers = async (q?: string) =>
  await makeAuthorizedRequest({
    url: "/user/all",
    params: { q },
  });
