import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { $JwtBody } from "../types";
import User from "../models/User";
import { $UserSchemaInterface } from "../types/models";

/**
 * Handles JWT Token authentication
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ status: "Unauthorized", details: "Missing token or expired" });

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
      async (err, userDecoded: JwtPayload | string | undefined) => {
        if (err || !userDecoded || typeof userDecoded === "string") {
          return res.status(403).json({
            status: "Forbidden",
            details: "Token is not valid or has expired",
          });
        }

        const user = await User.findOne({ username: userDecoded.username });

        req.profile = user as $UserSchemaInterface;
        next();
      }
    );
  } catch (error) {}
};
