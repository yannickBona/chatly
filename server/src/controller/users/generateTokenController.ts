import User from "../../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createAccessToken } from "../../utils";
import { $JwtBody } from "../../types";

/**
 * Refreshes the user session by creating a new access token whenever the old one has expired
 */
export const generateTokenController = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res
        .status(400)
        .json({ status: "Bad request", details: "Missing refresh token" });

    const tokenUser = await User.find({ refreshToken });

    if (!tokenUser)
      return res.status(403).json({
        status: "Forbidden",
        details: "Refresh token is not related to any user",
      });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
      async (
        err: unknown,
        user: JwtPayload | string | undefined | $JwtBody
      ) => {
        if (err || !user || typeof user === "string") {
          return res.status(403).json({
            status: "Forbidden",
            details: "Token is not valid or has expired",
          });
        }

        const newAccessToken = createAccessToken({ username: user.username });
        return res.status(200).json({ status: "ok", token: newAccessToken });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "Unhandled Error", details: err });
  }
};
