import { User } from "../../database/models";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../../utils";

/**
 *
 * @param req Request from the client
 * @param res Response of the view
 * @returns the user
 */
export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).send({
        status: 400,
        statusText: "Bad Request",
        details: "No username or password provided",
      });

    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).send({
        status: 404,
        statusText: "Not found",
        details: "User does not exist",
      });

    const logged = await bcrypt.compare(password, user.password);

    if (!logged) {
      return res.status(401).json({
        status: 401,
        statusText: "Forbidden",
        details: "Wrong credentials",
      });
    }

    // Creates a new JWT token given a SECRET
    const userData = {
      username: user.username,
    };

    const token = createAccessToken(userData);
    const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET!);

    user.refreshToken = refreshToken;
    user.save();

    return res.status(200).json({
      status: 200,
      statusText: "Success",
      user: { ...user.getPublicData(), token: token },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "Unhandled Error", details: err });
  }
};
