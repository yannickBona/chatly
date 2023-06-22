import { makeAuthorizedRequest } from "../makeRequest";
export const manageLikeOnPost = (
  postId: string,
  method: "DELETE" | "POST" | "GET"
) => {
  return makeAuthorizedRequest({ url: `/like/post/${postId}`, method: method });
};
