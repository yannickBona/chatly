import { $ResponseData } from "../../../types";
import { makeAuthorizedRequest } from "../makeRequest";

export const modifyPost = (
  postId: string,
  content: string
): Promise<$ResponseData> => {
  return makeAuthorizedRequest({
    url: `post/${postId}`,
    data: { content },
    method: "PUT",
  });
};
