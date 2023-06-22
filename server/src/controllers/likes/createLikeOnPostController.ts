import { logger } from "../../utils/helpers";
import { Like } from "../../database/models";
import { Response, Request } from "express";

/**
 * This sets a like on a post
 * @param req
 * @param res
 */
export const createLikeOnPostController = async (
  req: Request,
  res: Response
) => {
  logger.info(`Creating like on post ${req.params.id}`);
  try {
    const newLike = new Like({
      postId: req.params.id,
      userId: req.cookies.userId,
    });

    const savedLike = await newLike.save();
    logger.info(`Saved like on post ${req.params.id}`);

    return res.json(savedLike);
  } catch (err) {
    logger.error(err as string);
    return res.status(400).send({ status: "Error", details: err });
  }
};
