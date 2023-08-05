import { logger } from "../../utils/helpers";
import { Like } from "../../database/models";
import { Response, Request } from "express";
import {
  HTTP_400_BAD_REQUEST,
  HTTP_404_NOT_FOUND,
  HTTP_200_OK,
  HTTP_500_INTERNAL_SERVER_ERROR,
} from "../../utils/api";

/**
 * This sets a like on a comment
 * @param req
 * @param res
 */
export const removeLikeOnCommentController = async (
  req: Request,
  res: Response
) => {
  try {
    const profile = req.profile;
    const { id: commentId } = req.params;

    if (!commentId) return HTTP_400_BAD_REQUEST(res, "Post ID not provided");

    const deletedLike = await Like.findOneAndRemove({
      userId: profile._id,
      commentId,
    });

    if (!deletedLike)
      return res.status(400).json({
        ...HTTP_404_NOT_FOUND,
        details: `Like on comment ${commentId} not found`,
      });

    return res
      .status(200)
      .json({ ...HTTP_200_OK, data: { like: deletedLike.getPublicData() } });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
