import { makeAuthorizedRequest } from "../makeRequest";
export const manageLikeOnComment = (
  commentId: string,
  postId: string,
  method: "DELETE" | "POST" | "GET"
) => {
  return makeAuthorizedRequest({
    url: `/like/post/${postId}/comment/${commentId}`,
    method: method,
  });
};
