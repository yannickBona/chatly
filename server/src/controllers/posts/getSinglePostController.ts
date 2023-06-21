import { Post } from "../../database/models";
import { logger } from "../../utils";
import { Request, Response } from "express";

/**
 * Gets the details for a single post
 * @param req Request
 * @param res Response
 * @returns IPost
 */

export const getSinglePostController = async (req: Request, res: Response) => {
  const id = req.params.id;
  logger.info("Getting post with id", id);

  try {
    const singlePost = await Post.findById(id).populate("comments");
    return res.json(singlePost);
  } catch (err) {
    logger.error(`No post found for id ${id}`);
    return res.status(400).send({ status: "Error", details: err });
  }
};
