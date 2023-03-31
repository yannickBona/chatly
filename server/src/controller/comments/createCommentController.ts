import Post from "../../models/Post";
import Comment from "../../models/Comment";
import { Request, Response } from "express";
import { logger } from "../../utils/general";

/**
 *
 * @param req Request from the client
 * @param res Response of the view
 * @returns the new comment
 */

// TODO: ADD logic
export const createCommentController = async (req: Request, res: Response) => {
  logger.info("creating new Post...");
  // Creating new Post
  const newComment = new Comment({
    content: req.body.content,
    parentId: req.body.parentId,
  });

  const savedComment = await newComment.save();
  logger.info("post created.");

  return res.json(savedComment);
};
