import { makeRequest } from "../makeRequest";

export const editComment = (id: string, content: string) => {
  return makeRequest({
    url: "/comment",
    method: "PUT",
    data: { id, content },
  });
};
