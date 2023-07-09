import { Request, Response } from "express";
import { Post } from "../../database/models";
import { logger } from "../../utils/helpers";
import {
  HTTP_500_INTERNAL_SERVER_ERROR,
  HTTP_200_OK,
  HTTP_404_NOT_FOUND,
} from "../../utils/api";

/**
 * Deletes a post given its id
 * @param req Request
 * @param res Response
 * @returns the list of all posts
 */

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost)
      return res.status(404).json({
        ...HTTP_404_NOT_FOUND,
        details: "Post to delete not found",
      });

    return res
      .status(200)
      .json({ ...HTTP_200_OK, data: { post: deletedPost } });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
