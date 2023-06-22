import { IPost } from "../../types";
import { makeAuthorizedRequest } from "../makeRequest";

export const getPosts = (): Promise<IPost[]> =>
  makeAuthorizedRequest({ url: "/post/all" });
