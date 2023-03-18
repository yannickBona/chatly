import { IPost } from "../../types";
import { makeRequest } from "../makeRequest";

export const createPost = (post: IPost) => {
  return makeRequest("POST", "/createPost", post);
};
