import { Post, Like, Comment } from "../../database/models";
import { Request, Response } from "express";
import { logger } from "../../utils/helpers";

/**
 *
 * @param req Request from the client
 * @param res Response of the view
 * @returns the deleted comment
 */

export const deleteCommentController = async (req: Request, res: Response) => {
  logger.info("/deleteComment");
  try {
    const commentId: string = req.body.commentId;

    // Deleting comment ref from post
    const post = await Post.findOne({
      comments: { $elemMatch: { $eq: commentId } },
    });

    // Deleting comment ref from like
    const like = await Like.findOneAndDelete({ commentId });
    if (like) logger.info("Deleted like on comment ", commentId);

    if (!post) return res.json("No post related to the comment").status(404);
    post.comments = post?.comments.filter((c) => c.toString() !== commentId);
    await post.save();

    // Deleting comment
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    return res.json(deletedComment);
  } catch (err) {
    logger.error(err as string);
    return res.status(400).send({ status: "Error", details: err });
  }
};
