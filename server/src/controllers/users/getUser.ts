import { Request, Response } from "express";
import {
  HTTP_200_OK,
  HTTP_500_INTERNAL_SERVER_ERROR,
  HTTP_404_NOT_FOUND,
} from "../../utils/api";
import { User } from "../../database/models";

// Gets a user data given its username
export const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username: username });

    if (!user)
      return res
        .status(404)
        .json({ ...HTTP_404_NOT_FOUND, details: `User ${username} not found` });

    const publicUser = await user.getPublicData(false);

    return res.status(200).json({ ...HTTP_200_OK, data: publicUser });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
