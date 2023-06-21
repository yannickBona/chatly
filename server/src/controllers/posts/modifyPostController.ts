import { Request, Response } from "express";
import { logger } from "../../utils";
import { Post } from "../../database/models";

export const modifyPostController = async (req: Request, res: Response) => {
  const postId = req.params.id;
  if (!postId) return res.status(400);
  logger.info(`PUT /posts/${postId}`);

  const currentPost = await Post.findById(postId);
  if (!currentPost) return res.status(400);
  currentPost.body = req.body.content;
  const updatedPost = await currentPost.save();
  return res.status(200).json(updatedPost);
};
