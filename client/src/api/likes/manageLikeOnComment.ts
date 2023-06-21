import { makeRequest } from "../makeRequest";
export const manageLikeOnComment = (
  commentId: string,
  postId: string,
  method: "DELETE" | "POST" | "GET"
) => {
  return makeRequest({
    url: `/like/post/${postId}/comment/${commentId}`,
    method: method,
  });
};
