import { makeAuthorizedRequest } from "../makeRequest";

export const editComment = (id: string, content: string) => {
  return makeAuthorizedRequest({
    url: "/comment",
    method: "PUT",
    data: { id, content },
  });
};
