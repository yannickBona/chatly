import { Request, Response } from "express";
import { HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR } from "../../utils/api";

/**
 *
 * @param req Request from the client
 * @param res Response of the view
 * @returns the user
 */
export const sessionController = async (req: Request, res: Response) => {
  try {
    const user = req.profile.getPublicData();
    return res.status(200).json({ ...HTTP_200_OK, data: { user } });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
