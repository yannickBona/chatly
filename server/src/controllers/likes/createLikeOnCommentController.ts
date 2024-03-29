import { logger } from "../../utils/helpers";
import { Like } from "../../database/models";
import { Response, Request } from "express";
import { HTTP_400_BAD_REQUEST, HTTP_200_OK } from "../../utils/api";

/**
 * This sets a like on a post
 * @param req
 * @param res
 */
export const createLikeOnCommentController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: commentId } = req.params;
    const profile = req.profile;

    if (!commentId) return HTTP_400_BAD_REQUEST(res, "Comment ID not provided");

    const existLike = await Like.findOne({ commentId, userId: profile });
    if (!!existLike) return HTTP_400_BAD_REQUEST(res, "Comment already liked!");

    const newLike = new Like({
      commentId,
      userId: profile._id.toString(),
    });

    const savedLike = await newLike.save({ timestamps: false });

    return res
      .status(200)
      .json({ ...HTTP_200_OK, data: { like: savedLike.getPublicData() } });
  } catch (err) {
    logger.error(err as string);
    return res.status(400).send({ status: "Error", details: err });
  }
};
