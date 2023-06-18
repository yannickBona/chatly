import { Request, Response } from "express";
import { logger } from "../../utils/helpers";
import { Post } from "../../database/models";
import {
  HTTP_500_INTERNAL_SERVER_ERROR,
  HTTP_400_BAD_REQUEST,
  HTTP_200_OK,
} from "../../utils/api";

export const modifyPostController = async (req: Request, res: Response) => {
  try {
    const { id: postId } = req.params;
    const { content } = req.body;

    if (!postId)
      return res
        .status(400)
        .json({ ...HTTP_400_BAD_REQUEST, details: "No post ID was provided" });

    const currentPost = await Post.findByIdAndUpdate(postId, {
      body: content,
    });
    if (!currentPost)
      return res.status(400).json({
        ...HTTP_400_BAD_REQUEST,
        details: `Post ${postId} was not found`,
      });

    const updatedPost = await currentPost.save();
    return res
      .status(200)
      .json({ ...HTTP_200_OK, data: { post: updatedPost } });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
