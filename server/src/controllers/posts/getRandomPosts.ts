import { Request, Response } from "express";

import {
  HTTP_200_OK,
  HTTP_400_BAD_REQUEST,
  HTTP_500_INTERNAL_SERVER_ERROR,
} from "../../utils/api";
import { Post } from "../../database/models";
import { $PublicPost } from "../../types";
import { $PostSchemaInterface } from "../../database/types";

export const getRandomPosts = async (req: Request, res: Response) => {
  try {
    const profile = req.profile;
    const posts = await Post.find({ user: { $ne: profile } });
    if (!posts.length)
      return res
        .status(400)
        .json({ ...HTTP_400_BAD_REQUEST, details: "No random posts to get" });

    const count = posts.length;
    const randomPosts: $PublicPost[] = [];
    const usedIndices = new Set();

    while (randomPosts.length < 5 && usedIndices.size < count) {
      const randomIndex = Math.floor(Math.random() * count);

      if (!usedIndices.has(randomIndex)) {
        const randomPost: $PostSchemaInterface = posts[randomIndex];
        randomPosts.push(await randomPost.getPublicData());
        usedIndices.add(randomIndex);
      }
    }

    return res.status(200).json({ ...HTTP_200_OK, data: randomPosts });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
