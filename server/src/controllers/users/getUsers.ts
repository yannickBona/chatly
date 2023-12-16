import { Request, Response } from "express";
import { HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR } from "../../utils/api";
import { User } from "../../database/models";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const query: { username?: any } = {};

    if (!!q) query.username = { $regex: q };

    const users = await User.find(query);

    const publicUsers = await Promise.all(
      users.map(async (u) => await u.getPublicData())
    );
    return res.status(200).json({ ...HTTP_200_OK, data: publicUsers });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
