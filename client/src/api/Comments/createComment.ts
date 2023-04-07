import { makeRequest } from "../makeRequest";

export const createComment = (
  comment: string,
  postId: string,
  parentId?: string
) => {
  return makeRequest({
    url: `/createComment`,
    data: { comment: comment, postId: postId, parentId: parentId },
    method: "POST",
  });
};
