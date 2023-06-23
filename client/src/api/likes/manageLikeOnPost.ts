import { $ResponseData } from "../../types";
import { makeAuthorizedRequest } from "../makeRequest";
export const manageLikeOnPost = (
  postId: string,
  method: "DELETE" | "POST" | "GET"
): Promise<$ResponseData> => {
  return makeAuthorizedRequest({ url: `/like/post/${postId}`, method: method });
};
