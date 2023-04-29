import { IPost } from "../../types";
import { makeRequest } from "../makeRequest";

export const modifyPost = (postId: string, content: string): Promise<IPost> => {
  return makeRequest({
    url: `posts/${postId}`,
    data: { content },
    method: "PUT",
  });
};
