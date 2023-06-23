import { Comment } from "../../database/models";
import { Request, Response } from "express";
import { logger } from "../../utils/helpers";
import {
  HTTP_200_OK,
  HTTP_404_NOT_FOUND,
  HTTP_500_INTERNAL_SERVER_ERROR,
} from "../../utils/api";

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
    if (!comment)
      return res.status(404).json({
        ...HTTP_404_NOT_FOUND,
        details: "Comment not found",
      });

    comment.content = content;
    await comment.save();

    return res.status(200).json({ ...HTTP_200_OK, data: { comment } });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
