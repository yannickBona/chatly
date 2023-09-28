import { makeAuthorizedRequest } from "../makeRequest";

export const deleteComment = (commentId: string) => {
  return makeAuthorizedRequest({
    url: `/comment`,
    data: { commentId: commentId },
    method: "DELETE",
  });
};
