import { IPost } from "../../types";
import { makeAuthorizedRequest } from "../makeRequest";

export const deletePost = (id: string): Promise<IPost> =>
  makeAuthorizedRequest({ url: `/post`, method: "DELETE", data: { id: id } });
