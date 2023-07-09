import { $ResponseData } from "../../types";
import { makeAuthorizedRequest } from "../makeRequest";

export const getRandomPosts = (): Promise<$ResponseData> =>
  makeAuthorizedRequest({ url: "/post/all/random" });
