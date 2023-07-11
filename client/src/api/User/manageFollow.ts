import { makeAuthorizedRequest } from "../makeRequest";

export const unfollow = async (username: string) => {
  return makeAuthorizedRequest({
    url: "/user/follow",
    data: { username },
    method: "DELETE",
  });
};

export const follow = async (username: string) => {
  return makeAuthorizedRequest({
    url: "/user/follow",
    data: { username },
    method: "POST",
  });
};
