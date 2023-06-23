import { Comment } from "../../database/models";
import { Request, Response } from "express";
import { logger } from "../../utils/helpers";
import { isValidObjectId } from "mongoose";
import { HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR } from "../../utils/api";

export const getPostCommentsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: postId } = req.params;
    const comments = await Comment.find({ postId: postId });
    return res
      .status(200)
      .json({ ...HTTP_200_OK, data: { comment: comments } });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
