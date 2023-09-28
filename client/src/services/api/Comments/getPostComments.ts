import { makeAuthorizedRequest } from "../makeRequest";

export const getPostComments = (postId: string) => {
  return makeAuthorizedRequest({ url: `/comment/post/${postId}` });
};
