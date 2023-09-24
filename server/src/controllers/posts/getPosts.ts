import { Request, Response } from "express";
import { Post, User } from "../../database/models";
import {
  HTTP_500_INTERNAL_SERVER_ERROR,
  HTTP_200_OK,
  HTTP_404_NOT_FOUND,
} from "../../utils/api";
import { $CommentSchemaInterface } from "../../database/types";
import { $PublicComment, $PublicPost } from "../../types";

/**
 * Gets all the posts when the page first loads
 * @param req Request
 * @param res Response
 * @returns the list of all posts
 */

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { username } = req.query;
    let profile = req.profile;

    if (username) {
      const usernameProfile = await User.findOne({ username: username });

      if (!usernameProfile) {
        return res.status(404).json({
          ...HTTP_404_NOT_FOUND,
          details: `Unable to retrieve posts for profile ${username}: profile not found`,
        });
      }

      profile = usernameProfile;
    }

    const followedAccounts = [];

    for (const username of profile.followed) {
      const user = await User.findOne({ username });
      followedAccounts.push(user?._id);
    }

    const posts = await Post.find({
      $or: [{ user: profile }, { user: { $in: followedAccounts } }],
    }).populate("comments");

    const postList: $PublicPost[] = await Promise.all(
      posts.map(async (post) => {
        const publicPost = await post.getPublicData();

        const publicPostComments: $PublicComment[] = await Promise.all(
          //@ts-ignore: comment is interpreted as ObjectId even though using .populate() gets the entire object
          post.comments.map(async (comment: $CommentSchemaInterface) => {
            return await comment.getPublicData();
          })
        );

        return { ...publicPost, comments: publicPostComments };
      })
    );

    return res
      .status(200)
      .json({ ...HTTP_200_OK, data: { posts: postList.reverse() } });
  } catch (err) {
    return res
      .status(500)
      .json({ ...HTTP_500_INTERNAL_SERVER_ERROR, details: err });
  }
};
