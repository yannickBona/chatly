import { IPost } from "../../types";
import { makeRequest } from "../makeRequest";

export const getPosts = (): Promise<IPost[]> => makeRequest({ url: "/posts" });
