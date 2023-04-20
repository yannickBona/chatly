import { logger } from "../../utils/general";
import Like from "../../models/Like";
import { Response, Request } from "express";

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
    const userId = req.cookies.userId;
    const deletedLike = await Like.findOneAndRemove({
      userId: userId,
      commentId: req.params.commentId,
    });
    logger.info(`Removed like on comment ${req.params.commentId}`);

    return res.json(deletedLike);
  } catch (err) {
    logger.error(err as string);
    return res.status(400).send({ status: "Error", details: err });
  }
};
