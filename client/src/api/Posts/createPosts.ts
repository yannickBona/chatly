import { IPost } from "../../types";
import { makeAuthorizedRequest } from "../makeRequest";

export const createPost = (post: IPost) => {
  return makeAuthorizedRequest({ url: "/post", method: "POST", data: post });
};
