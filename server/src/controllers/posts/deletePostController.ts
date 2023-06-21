import { Request, Response } from "express";
import { Post } from "../../database/models";
import { logger } from "../../utils";

/**
 * Deletes a post given its id
 * @param req Request
 * @param res Response
 * @returns the list of all posts
 */

export const deletePostController = async (req: Request, res: Response) => {
  const id = req.body.id;
  logger.info(`/posts DELETE`, id);
  const deletedPost = await Post.findByIdAndDelete(id);
  logger.info(`post deleted ${id}`);
  return res.status(200).json(deletedPost);
};
