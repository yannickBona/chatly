import Post from "../../models/Post";
import Comment from "../../models/Comment";
import { Request, Response } from "express";
import { logger } from "../../utils/general";
import Comments from "../../models/Comment";
import { isValidObjectId } from "mongoose";

export const getPostCommentsController = async (
  req: Request,
  res: Response
) => {
  logger.info(`/posts/${req.params.id}/comments`);
  try {
    const postId = req.params.id;
    const comments = await Comments.find({ postId: postId });
    return res.json(comments);
  } catch (err) {
    logger.error(err as string);
    return res.status(400).send({ status: "Error", details: err });
  }
};
