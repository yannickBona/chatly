import { Request, Response } from "express";
import {
  HTTP_200_OK,
  HTTP_400_BAD_REQUEST,
  HTTP_404_NOT_FOUND,
  HTTP_500_INTERNAL_SERVER_ERROR,
} from "../../utils/api";
import { User } from "../../database/models";

export const follow = async (req: Request, res: Response) => {
  try {
    const profile = req.profile;
    const { username } = req.body;

    if (!username) return HTTP_400_BAD_REQUEST(res, "Username not provided");

    if (req.profile.username === username)
      return HTTP_400_BAD_REQUEST(res, "Can't follow yourself!");

    // Add the new follower to given username
    const followedUser = await User.findOne({ username });
    if (!followedUser)
      return res.status(404).json({
        ...HTTP_404_NOT_FOUND,
        details: "Given username doesn't exist",
      });

    if (
      followedUser.followers.some((follower) => follower === profile.username)
    )
      return HTTP_400_BAD_REQUEST(
        res,
        `Already following ${followedUser.username}`
      );

    followedUser.followers.push(profile.username);
    await followedUser.save();

    // Add user to followed
    const followingUser = await User.findById(profile);
    if (!followingUser)
      return res.status(404).json({
        ...HTTP_404_NOT_FOUND,
        details: "Authorized user doesn't exist",
      });

    followingUser.followed.push(username);
    await followingUser.save();

    return res
      .status(200)
      .json({ ...HTTP_200_OK, data: followingUser.followed });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};

export const unfollow = async (req: Request, res: Response) => {
  try {
    const profile = req.profile;
    const { username } = req.body;

    if (!username) return HTTP_400_BAD_REQUEST(res, "Username not provided");

    if (req.profile.username === username)
      return HTTP_400_BAD_REQUEST(res, "Can't unfollow yourself!");

    // Add the new follower to given username
    const unfollowedUser = await User.findOne({ username });
    if (!unfollowedUser)
      return res.status(404).json({
        ...HTTP_404_NOT_FOUND,
        details: "Given username doesn't exist",
      });

    if (
      !unfollowedUser.followers.some(
        (follower) => follower === profile.username
      )
    )
      return HTTP_400_BAD_REQUEST(
        res,
        "Already not following ${unfollowedUser.username}"
      );

    await User.updateOne(
      { username },
      { $pull: { followers: profile.username } }
    );

    // Add user to followed
    const unfollowingUser = await User.findById(profile);
    if (!unfollowingUser)
      return res.status(404).json({
        ...HTTP_404_NOT_FOUND,
        details: "Authorized user doesn't exist",
      });

    await User.updateOne(profile, { $pull: { followed: username } });

    return res
      .status(200)
      .json({ ...HTTP_200_OK, data: unfollowingUser.followed });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
