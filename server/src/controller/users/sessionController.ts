import { Request, Response } from "express";

/**
 *
 * @param req Request from the client
 * @param res Response of the view
 * @returns the user
 */
export const sessionController = async (req: Request, res: Response) => {
  try {
    const user = req.profile.getPublicData();
    return res.status(200).json({ status: "ok", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "Unhandled Error", details: err });
  }
};
