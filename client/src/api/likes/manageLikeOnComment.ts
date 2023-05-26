import { makeRequest } from "../makeRequest";
export const manageLikeOnComment = (
  commentId: string,
  postId: string,
  method: "DELETE" | "POST" | "GET"
) => {
  return makeRequest({
    url: `posts/${postId}/comments/${commentId}/like`,
    method: method,
  });
};