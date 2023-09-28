import { $ResponseData } from "../../../types";
import { makeAuthorizedRequest, makeRequest } from "../makeRequest";

export const createComment = (
  comment: string,
  postId: string,
  parentId?: string
): Promise<$ResponseData> => {
  return makeAuthorizedRequest({
    url: `/comment`,
    data: { comment: comment, postId: postId, parentId: parentId },
    method: "POST",
  });
};
