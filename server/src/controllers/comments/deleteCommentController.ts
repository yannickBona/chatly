import { Post, Like, Comment } from "../../database/models";
import { Request, Response } from "express";
import { logger } from "../../utils/helpers";
import {
  HTTP_200_OK,
  HTTP_404_NOT_FOUND,
  HTTP_500_INTERNAL_SERVER_ERROR,
} from "../../utils/api";

/**
 *
 * @param req Request from the client
 * @param res Response of the view
 * @returns the deleted comment
 */

export const deleteCommentController = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.body;

    // Deleting comment ref from post
    const post = await Post.findOne({
      comments: { $elemMatch: { $eq: commentId } },
    });

    if (!post)
      return res.status(404).json({
        ...HTTP_404_NOT_FOUND,
        details: "No post related to the comment",
      });

    // Deleting comment ref from like
    const like = await Like.findOneAndDelete({ commentId });
    if (like) logger.info("Deleted like on comment ", commentId);

    post.comments = post.comments.filter((c) => c.toString() !== commentId);
    await post.save();

    // Deleting comment
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment)
      return res.status(404).json({
        ...HTTP_404_NOT_FOUND,
        details: `No comment related to id ${commentId}`,
      });

    return res
      .status(200)
      .json({ ...HTTP_200_OK, data: { comment: deletedComment } });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
