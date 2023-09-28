import { $ResponseData } from "../../types";
import { makeAuthorizedRequest } from "../makeRequest";

export const getPosts = (username?: string): Promise<$ResponseData> => {
  const params = username ? { username } : {};
  return makeAuthorizedRequest({ url: "/post/all", params });
};
