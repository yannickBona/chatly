import { $ResponseData } from "../../types";
import { makeAuthorizedRequest } from "../makeRequest";

export const getPosts = (): Promise<$ResponseData> =>
  makeAuthorizedRequest({ url: "/post/all" });
