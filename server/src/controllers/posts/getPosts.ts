import { Request, Response } from "express";
import { Post } from "../../database/models";
import { HTTP_500_INTERNAL_SERVER_ERROR, HTTP_200_OK } from "../../utils/api";
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
    const posts = await Post.find().populate("comments");

    const postList: $PublicPost[] = await Promise.all(
      posts.map(async (post) => {
        const publicPost = await post.getPublicData();

        const publicPostComments: $PublicComment[] = await Promise.all(
          //@ts-ignore
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
