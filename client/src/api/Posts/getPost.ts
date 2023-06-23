import { $ResponseData } from "../../types";
import { makeAuthorizedRequest } from "../makeRequest";

export const getPost = (id: string): Promise<$ResponseData> =>
  makeAuthorizedRequest({ url: `/post/${id}` });
