import { Request, Response } from "express";
import Posts from "../../models/Post";
import { logger } from "../../utils/general";

/**
 * Gets all the posts when the page first loads
 * @param req Request
 * @param res Response
 * @returns the list of all posts
 */

export const getPostsController = async (req: Request, res: Response) => {
  logger.info("/posts");
  // console.log("PROFILE", req.profile);
  const posts = await Posts.find().populate("comments", "likes");
  return res.json(posts.reverse());
};
