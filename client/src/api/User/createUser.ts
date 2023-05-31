import { makeRequest } from "../makeRequest";

export const createUser = (
  name: string,
  lastName: string,
  username: string,
  password: string
) => {
  return makeRequest({
    url: `/user/create`,
    data: { username, password },
    method: "POST",
  });
};
