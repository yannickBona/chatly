import { Request, Response } from "express";
import Posts from "../../models/Post";
import { IPost } from "../../types/models";
import { logger } from "../../utils/general";

/**
 * Gets all the posts when the page first loads
 * @param req Request
 * @param res Response
 * @returns the list of all posts
 */

export const getPostsController = async (req: Request, res: Response) => {
  logger.info("Getting posts...");
  const posts = await Posts.find();
  return res.json(posts.reverse());
};
