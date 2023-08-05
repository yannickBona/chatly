import { Request, Response } from "express";

import {
  HTTP_200_OK,
  HTTP_400_BAD_REQUEST,
  HTTP_500_INTERNAL_SERVER_ERROR,
} from "../../utils/api";
import { User } from "../../database/models";
import { $UserSchemaInterface } from "../../database/types";

export const getSuggestedUsers = async (req: Request, res: Response) => {
  try {
    const profile = req.profile;

    const users = await User.find({
      _id: { $ne: profile },
      followers: { $nin: profile.username },
    });
    if (!users.length)
      return HTTP_400_BAD_REQUEST(
        res,
        "No suggested users to get, already following all users"
      );

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
