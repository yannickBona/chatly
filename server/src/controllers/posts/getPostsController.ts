import { Request, Response } from "express";
import { Post } from "../../database/models";
import { HTTP_500_INTERNAL_SERVER_ERROR, HTTP_200_OK } from "../../utils/api";

/**
 * Gets all the posts when the page first loads
 * @param req Request
 * @param res Response
 * @returns the list of all posts
 */

export const getPostsController = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("comments");
    return res
      .status(200)
      .json({ ...HTTP_200_OK, data: { posts: posts.reverse() } });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
