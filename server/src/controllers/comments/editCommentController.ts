import { Comment } from "../../database/models";
import { Request, Response } from "express";
import { logger } from "../../utils/helpers";

/**
 *
 * @param req Request from the client
 * @param res Response of the view
 * @returns the new comment
 */

export const editCommentController = async (req: Request, res: Response) => {
  logger.info("PUT /comment");
  try {
    const { id, content } = req.body;

    // modifing comment
    const comment = await Comment.findById(id);
    if (!comment) return res.json("Comment not found").status(404);
    comment.content = content;
    await comment.save();

    return res.json(comment);
  } catch (err) {
    logger.error(err as string);
    return res.status(400).send({ status: "Error", details: err });
  }
};
