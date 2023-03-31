import { Request, Response } from "express";
import Post from "../../models/Post";
import { IPost } from "../../types/models";
import { logger } from "../../utils/general";

/**
 * Deletes a post given its id
 * @param req Request
 * @param res Response
 * @returns the list of all posts
 */

export const deletePostController = async (req: Request, res: Response) => {
  const id = req.body.id;
  logger.info(`deleting post${id}`);
  const deletedPost = await Post.findByIdAndDelete(id);
  logger.info(`post deleted${id}`);
  return res.status(200).json(deletedPost);
};
