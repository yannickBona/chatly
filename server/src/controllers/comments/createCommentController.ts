import { Post, Comment } from "../../database/models";

import { Request, Response } from "express";
import { logger } from "../../utils/helpers";

/**
 *
 * @param req Request from the client
 * @param res Response of the view
 * @returns the new comment
 */

export const createCommentController = async (req: Request, res: Response) => {
  logger.info("/createComment");
  try {
    const postId: string = req.body.postId;

    // Creating new Post
    const newComment = new Comment({
      content: req.body.comment,
      parentId: req.body.parentId,
      userId: req.cookies.userId,
      postId: postId,
    });

    // saving comment
    const savedComment = await newComment.save();

    // Adding comment reference in post
    const post = await Post.findById(postId);
    post?.comments.push(newComment._id);
    await post?.save();

    return res.json(savedComment);
  } catch (err) {
    logger.error(err as string);
    return res.status(400).send({ status: "Error", details: err });
  }
};
