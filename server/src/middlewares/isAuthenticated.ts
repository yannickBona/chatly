import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { $JwtBody } from "../types";

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

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: "Forbidden",
          details: "Token is not valid or has expired",
        });
      }
      console.log(user);

      req.profile = user as $JwtBody;
      next();
    });
  } catch (error) {}
};
