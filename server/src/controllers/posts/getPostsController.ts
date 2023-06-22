import { Request, Response } from "express";
import { Post } from "../../database/models";
import { logger } from "../../utils";

/**
 * Gets all the posts when the page first loads
 * @param req Request
 * @param res Response
 * @returns the list of all posts
 */

export const getPostsController = async (req: Request, res: Response) => {
  const posts = await Post.find().populate("comments", "likes");
  return res.json(posts.reverse());
};
