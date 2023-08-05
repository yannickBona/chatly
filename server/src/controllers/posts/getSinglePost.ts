import { Post } from "../../database/models";
import { $CommentSchemaInterface } from "../../database/types";
import { $PublicComment } from "../../types";
import {
  HTTP_500_INTERNAL_SERVER_ERROR,
  HTTP_200_OK,
  HTTP_404_NOT_FOUND,
  HTTP_400_BAD_REQUEST,
} from "../../utils/api";
import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

/**
 * Gets the details for a single post
 * @param req Request
 * @param res Response
 * @returns IPost
 */

export const getSinglePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return HTTP_400_BAD_REQUEST(res, "An object id must be provided");

    const singlePost = await Post.findById(id).populate("comments");

    if (!singlePost)
      return res.status(200).json({
        ...HTTP_404_NOT_FOUND,
        details: "Post not found",
      });

    const publicPost = await singlePost.getPublicData();

    const publicComments: $PublicComment[] = await Promise.all(
      //@ts-ignore
      singlePost.comments.map(async (comment: $CommentSchemaInterface) => {
        return await comment.getPublicData();
      })
    );

    publicPost.comments = publicComments;

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
