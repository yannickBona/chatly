import { Post, Comment } from "../../database/models";

import { Request, Response } from "express";
import { logger } from "../../utils/helpers";
import {
  HTTP_200_OK,
  HTTP_400_BAD_REQUEST,
  HTTP_404_NOT_FOUND,
  HTTP_500_INTERNAL_SERVER_ERROR,
} from "../../utils/api";

/**
 *
 * @param req Request from the client
 * @param res Response of the view
 * @returns the new comment
 */

export const createCommentController = async (req: Request, res: Response) => {
  try {
    const { postId, comment, parentId } = req.body;
    const profile = req.profile;

    if (!postId)
      return res
        .status(400)
        .json({ ...HTTP_400_BAD_REQUEST, details: "No post ID provided" });

    // Creating new Post
    const newComment = new Comment({
      content: comment,
      parentId,
      userId: profile._id.toString(),
      postId,
    });

    // saving comment
    const savedComment = await newComment.save();

    // Adding comment reference in post
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ ...HTTP_404_NOT_FOUND, details: "Post not found" });
    post.comments.push(newComment._id);
    await post.save();

    return res
      .status(200)
      .json({ ...HTTP_200_OK, data: { comment: savedComment } });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
