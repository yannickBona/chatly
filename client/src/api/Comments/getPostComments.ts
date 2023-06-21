import { makeRequest } from "../makeRequest";

export const getPostComments = (postId: string) => {
  return makeRequest({ url: `/comment/post/${postId}` });
};
