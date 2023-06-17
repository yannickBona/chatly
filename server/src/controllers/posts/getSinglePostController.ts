import { Post } from "../../database/models";
import {
  HTTP_500_INTERNAL_SERVER_ERROR,
  HTTP_200_OK,
  HTTP_404_NOT_FOUND,
} from "../../utils/api";
import { Request, Response } from "express";

/**
 * Gets the details for a single post
 * @param req Request
 * @param res Response
 * @returns IPost
 */

export const getSinglePostController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const singlePost = await Post.findById(id).populate("comments");

    if (!singlePost)
      return res.status(200).json({
        ...HTTP_404_NOT_FOUND,
        details: "Post not found",
      });

    const publicPost = await singlePost.getPublicData();

    return res.status(200).json({
      ...HTTP_200_OK,
      data: { post: publicPost },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
