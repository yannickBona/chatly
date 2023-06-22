import { IPost } from "../../types";
import { makeAuthorizedRequest } from "../makeRequest";

export const getPost = (id: string): Promise<IPost[]> =>
  makeAuthorizedRequest({ url: `/post/${id}` });
