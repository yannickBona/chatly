import { logger } from "../../utils/general";
import Like from "../../models/Like";
import { Response, Request } from "express";

/**
 * This sets a like on a post
 * @param req
 * @param res
 */
export const createLikeOnCommentController = async (
  req: Request,
  res: Response
) => {
  logger.info(`Creating like on comment ${req.params.commentId}`);
  try {
    const newLike = new Like({
      commentId: req.params.commentId,
      userId: req.cookies.userId,
    });

    const savedLike = await newLike.save();
    logger.info(`Saved like on comment ${req.params.commentId}`);

    return res.json(savedLike);
  } catch (err) {
    logger.error(err as string);
    return res.status(400).send({ status: "Error", details: err });
  }
};
