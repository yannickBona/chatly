import { User } from "../../database/models";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

/**
 *
 * @param req Request from the client
 * @param res Response of the view
 * @returns the new user
 */
export const createUserController = async (req: Request, res: Response) => {
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

    // Create a new user
    const newUser = new User({
      username: username,
      password: hashedPassword,
      name: name,
      lastName: lastName,
    });
    const savedUser = await newUser.save();

    return res.status(200).json({
      status: 200,
      statusText: "Success",
      user: savedUser.getPublicData(),
    });
  } catch (err) {
    return res.status(500).json({ status: "Unhandled Error", details: err });
  }
};
