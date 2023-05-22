import { makeRequest } from "../makeRequest";

export const deleteComment = (commentId: string) => {
  return makeRequest({
    url: `/comment`,
    data: { commentId: commentId },
    method: "DELETE",
  });
};
