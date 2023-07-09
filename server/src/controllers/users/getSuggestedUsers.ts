import { Request, Response } from "express";

import {
  HTTP_200_OK,
  HTTP_400_BAD_REQUEST,
  HTTP_500_INTERNAL_SERVER_ERROR,
} from "../../utils/api";
import { Post, User } from "../../database/models";
import { $PublicPost, $PublicUser } from "../../types";
import {
  $PostSchemaInterface,
  $UserSchemaInterface,
} from "../../database/types";

export const getSuggestedUsers = async (req: Request, res: Response) => {
  try {
    const profile = req.profile;
    const users = await User.find({ $ne: profile });
    if (!users.length)
      return res.status(400).json({
        ...HTTP_400_BAD_REQUEST,
        details: "No suggested users to get, already following all users",
      });

    const count = users.length;
    const randomUsers: string[] = [];
    const usedIndices = new Set();

    while (randomUsers.length < 5 && usedIndices.size < count) {
      const randomIndex = Math.floor(Math.random() * count);

      if (!usedIndices.has(randomIndex)) {
        const randomUser: $UserSchemaInterface = users[randomIndex];
        randomUsers.push(randomUser.username);
        usedIndices.add(randomIndex);
      }
    }

    return res.status(200).json({ ...HTTP_200_OK, data: randomUsers });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
