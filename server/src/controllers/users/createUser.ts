import { User } from "../../database/models";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  HTTP_200_OK,
  createAccessToken,
  setRefreshTokenCookie,
} from "../../utils/api";
import jwt from "jsonwebtoken";

/**
 *
 * @param req Request from the client
 * @param res Response of the view
 * @returns the new user
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, name, lastName } = req.body;

    if (!username || !password)
      return res.status(400).send({
        status: 400,
        statusText: "Bad Request",
        details: "No username or password provided",
      });

    const user = await User.findOne({ username });
    if (user)
      return res.status(400).send({
        status: 400,
        statusText: "Bad Request",
        details: "User already exists",
      });

    // Generate Salt for the user
    const salt = await bcrypt.genSalt();

    // Hash user's password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creates a new JWT token given a SECRET
    const userData = { username };

    const token = createAccessToken(userData);
    const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET!);

    setRefreshTokenCookie(res, refreshToken);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      lastName,
      refreshToken,
    });
    const savedUser = await newUser.save();
    const publicUserData = await savedUser.getPublicData();

    const responseBody = { user: { ...publicUserData }, token };

    return res.status(200).json({ ...HTTP_200_OK, data: responseBody });
  } catch (err) {
    return res.status(500).json({ status: "Unhandled Error", details: err });
  }
};
