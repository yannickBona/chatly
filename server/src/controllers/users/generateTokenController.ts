import { User } from "../../database/models";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createAccessToken } from "../../utils/api";
import { $JwtBody } from "../../types";
import {
  HTTP_200_OK,
  HTTP_403_FORBIDDEN,
  HTTP_400_BAD_REQUEST,
  HTTP_500_INTERNAL_SERVER_ERROR,
} from "../../utils/api";

/**
 * Refreshes the user session by creating a new access token whenever the old one has expired
 */
export const generateTokenController = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res
        .status(400)
        .json({ ...HTTP_400_BAD_REQUEST, details: "Missing refresh token" });

    const tokenUser = await User.find({ refreshToken });

    if (!tokenUser)
      return res.status(403).json({
        ...HTTP_403_FORBIDDEN,
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
            ...HTTP_403_FORBIDDEN,
            details: "Token is not valid or has expired",
          });
        }

        const newAccessToken = createAccessToken({ username: user.username });
        return res
          .status(200)
          .json({ ...HTTP_200_OK, data: { token: newAccessToken } });
      }
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
