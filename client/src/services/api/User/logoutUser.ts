import { TUser } from "../../../contexts/types";
import { makeAuthorizedRequest } from "../makeRequest";

export const logoutUser = (): Promise<{
  status: string;
  user: TUser;
}> => {
  return makeAuthorizedRequest({
    url: `/user/logout`,
    method: "GET",
  });
};
