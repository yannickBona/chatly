import { logger } from "../../utils/helpers";
import { Like } from "../../database/models";
import { Response, Request } from "express";
import {
  HTTP_500_INTERNAL_SERVER_ERROR,
  HTTP_200_OK,
  HTTP_400_BAD_REQUEST,
  HTTP_404_NOT_FOUND,
} from "../../utils/api";

/**
 * This sets a like on a post
 * @param req
 * @param res
 */
export const removeLikeOnPostController = async (
  req: Request,
  res: Response
) => {
  try {
    const profile = req.profile;

    const { id: postId } = req.params;

    if (!postId)
      return res.status(400).json({
        ...HTTP_400_BAD_REQUEST,
        details: `Post ID not provided`,
      });

    const deletedLike = await Like.findOneAndRemove({
      userId: profile._id,
      postId,
    });

    if (!deletedLike)
      return res.status(400).json({
        ...HTTP_404_NOT_FOUND,
        details: `Like on post ${postId} not found`,
      });

    return res
      .status(200)
      .json({ ...HTTP_200_OK, data: { like: deletedLike } });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
