import { User } from "../../database/models";
import { Request, Response } from "express";
import { HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR } from "../../utils/api";

export const logoutUserController = async (req: Request, res: Response) => {
  try {
    const profile = req.profile;
    const user = await User.findById(profile);
    if (!user)
      return res
        .status(404)
        .json({ status: "Not found", details: "User not found" });

    user.refreshToken = null;
    const loggedOutUser = await user.save();
    return res
      .status(200)
      .json({ ...HTTP_200_OK, data: { user: loggedOutUser } });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
