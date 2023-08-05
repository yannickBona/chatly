import { Request, Response } from "express";
import { logger } from "../../utils/helpers";
import { Post } from "../../database/models";
import {
  HTTP_500_INTERNAL_SERVER_ERROR,
  HTTP_400_BAD_REQUEST,
  HTTP_200_OK,
} from "../../utils/api";

export const modifyPost = async (req: Request, res: Response) => {
  try {
    const { id: postId } = req.params;
    const { content } = req.body;

    if (!postId) return HTTP_400_BAD_REQUEST(res, "No post ID was provided");

    const currentPost = await Post.findByIdAndUpdate(
      postId,
      {
        body: content,
      },
      { new: true }
    );

    if (!currentPost)
      return HTTP_400_BAD_REQUEST(res, `Post ${postId} was not found`);

    const publicPost = await currentPost.getPublicData();
    return res.status(200).json({ ...HTTP_200_OK, data: { post: publicPost } });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
