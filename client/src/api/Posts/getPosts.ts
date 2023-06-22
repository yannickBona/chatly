import { IPost } from "../../types";
import { makeAuthorizedRequest, makeRequest } from "../makeRequest";

export const getPosts = (): Promise<IPost[]> =>
  makeAuthorizedRequest({ url: "/post/all" });
