import { Post } from "../../database/models";
import { Request, Response } from "express";
import { logger } from "../../utils";

/**
 *
 * @param req Request from the client
 * @param res Response of the view
 * @returns the new deck
 */
export const createPostController = async (req: Request, res: Response) => {
  logger.info("creating new Post...");
  // Creating new Post
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
  });

  const savedPost = await newPost.save();
  logger.info("post created.");

  return res.json(savedPost);
};
