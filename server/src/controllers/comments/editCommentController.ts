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
    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        content: content,
      },
      { new: true }
    );

    if (!comment)
      return res.status(404).json({
        ...HTTP_404_NOT_FOUND,
        details: "Comment not found",
      });

    const publicComment = await comment.getPublicData();

    return res
      .status(200)
      .json({ ...HTTP_200_OK, data: { comment: publicComment } });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
