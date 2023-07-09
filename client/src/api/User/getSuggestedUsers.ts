import { makeAuthorizedRequest } from "../makeRequest";

export const getSuggestedUsers = () => {
  return makeAuthorizedRequest({
    url: `/user/suggested`,
  });
};
