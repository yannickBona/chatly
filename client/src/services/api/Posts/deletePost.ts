import { $ResponseData, IPost } from "../../../types";
import { makeAuthorizedRequest } from "../makeRequest";

export const deletePost = (id: string): Promise<$ResponseData> =>
  makeAuthorizedRequest({ url: `/post`, method: "DELETE", data: { id: id } });
