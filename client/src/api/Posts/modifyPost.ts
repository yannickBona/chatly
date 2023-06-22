import { IPost } from "../../types";
import { makeAuthorizedRequest } from "../makeRequest";

export const modifyPost = (postId: string, content: string): Promise<IPost> => {
  return makeAuthorizedRequest({
    url: `post/${postId}`,
    data: { content },
    method: "PUT",
  });
};
