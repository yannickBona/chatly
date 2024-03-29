import { Post } from "../../database/models";
import { Request, Response } from "express";
import {
  HTTP_200_OK,
  HTTP_500_INTERNAL_SERVER_ERROR,
  HTTP_400_BAD_REQUEST,
} from "../../utils/api";

/**
 *
 * @param req Request from the client
 * @param res Response of the view
 * @returns the new deck
 */
export const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.profile;
    const { body, title } = req.body;

    if (!title)
      return HTTP_400_BAD_REQUEST(res, "A title for the post must be provided");

    const newPost = new Post({
      title,
      body,
      user,
    });

    const savedPost = await newPost.save();
    const publicPost = await savedPost.getPublicData();

    return res.status(200).json({ ...HTTP_200_OK, data: { post: publicPost } });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
