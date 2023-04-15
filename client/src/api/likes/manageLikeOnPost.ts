import { makeRequest } from "../makeRequest";
export const manageLikeOnPost = (
  postId: string,
  method: "DELETE" | "POST" | "GET"
) => {
  return makeRequest({ url: `/post/${postId}/like`, method: method });
};
