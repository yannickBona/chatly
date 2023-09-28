import { makeRequest } from "../makeRequest";

export const loginUser = (
  username: string,
  password: string
): Promise<{ status: string; user: { username: string } }> => {
  return makeRequest({
    url: `/user/login`,
    data: { username, password },
    method: "POST",
  });
};
