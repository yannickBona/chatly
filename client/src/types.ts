export interface IPost {
  _id?: string;
  title: string;
  body: string;
}

export interface IPostComponent extends IPost {
  isHomePage?: boolean;
}

export type ReqMethods = "GET" | "POST" | "PUT" | "DELETE";
