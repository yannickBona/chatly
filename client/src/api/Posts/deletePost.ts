import { IPost } from "../../types";
import { makeRequest } from "../makeRequest";

export const deletePost = (id: string): Promise<IPost> =>
  makeRequest({ url: `/posts`, method: "DELETE", data: { id: id } });
