import { logger } from "../../utils/general";
import Like from "../../models/Like";
import { Response, Request } from "express";

/**
 * This sets a like on a post
 * @param req
 * @param res
 */
export const removeLikeOnPostController = async (
  req: Request,
  res: Response
) => {
  logger.info(`Removing like on post ${req.params.id}`);

  try {
    const userId = req.cookies.userId;
    const deletedLike = await Like.findOneAndRemove({
      userId: userId,
      postId: req.params.id,
    });
    logger.info(`Removed like on post ${req.params.id}`);

    return res.json(deletedLike);
  } catch (err) {
    logger.error(err as string);
    return res.status(400).send({ status: "Error", details: err });
  }
};
