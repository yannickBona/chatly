import { IPost } from "../../types";
import { makeRequest } from "../makeRequest";

export const createPost = (post: IPost) => {
  return makeRequest("/createPost", post);
};
