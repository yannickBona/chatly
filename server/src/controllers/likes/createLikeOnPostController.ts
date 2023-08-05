import { logger } from "../../utils/helpers";
import { Like } from "../../database/models";
import { Response, Request } from "express";
import { HTTP_200_OK, HTTP_400_BAD_REQUEST } from "../../utils/api";

/**
 * This sets a like on a post
 * @param req
 * @param res
 */
export const createLikeOnPostController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: postId } = req.params;
    const profile = req.profile;

    if (!postId) return HTTP_400_BAD_REQUEST(res, "Post ID not provided");

    const existLike = await Like.findOne({ postId, userId: profile });
    if (!!existLike) return HTTP_400_BAD_REQUEST(res, "Post already liked!");

    const newLike = new Like({
      postId,
      userId: profile._id.toString(),
    });

    const savedLike = await newLike.save({ timestamps: false });

    return res.status(200).json({ ...HTTP_200_OK, data: { like: savedLike } });
  } catch (err) {
    logger.error(err as string);
    return res.status(500).send({ status: "Error", details: err });
  }
};
