import { $ResponseData, IPost } from "../../types";
import { makeAuthorizedRequest } from "../makeRequest";

export const createPost = (post: IPost): Promise<$ResponseData> => {
  return makeAuthorizedRequest({ url: "/post", method: "POST", data: post });
};
