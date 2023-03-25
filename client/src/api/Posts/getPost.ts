import { IPost } from "../../types";
import { makeRequest } from "../makeRequest";

export const getPost = (id: string): Promise<IPost[]> =>
  makeRequest({ url: `/posts/${id}` });