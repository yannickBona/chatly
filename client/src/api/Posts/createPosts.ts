import { IPost } from "../../types";
import { makeRequest } from "../makeRequest";

export const createPost = (post: IPost) => {
  return makeRequest({ url: "/post", method: "POST", data: post });
};
