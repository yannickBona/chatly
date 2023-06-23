import { Post } from "../../database/models";
import { HTTP_500_INTERNAL_SERVER_ERROR, HTTP_200_OK } from "../../utils/api";
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
    return res.status(200).json({
      ...HTTP_200_OK,
      data: { post: singlePost?.getPublicData() },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
