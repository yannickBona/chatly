import { makeRequest } from "../makeRequest";
import { TUser } from "../../contexts/types";
import { $ResponseData } from "../../types";

export const getUser = (username: string): Promise<$ResponseData<TUser>> =>
  makeRequest({ url: `/user/profile/${username}` });
