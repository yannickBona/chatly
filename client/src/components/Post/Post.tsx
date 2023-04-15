import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
} from "react-icons/ai";
import { ILike, IPost, IPostComponent } from "../../types";
import styled from "./styled";
import { useAsyncFn } from "../../hooks/useAsync";
import { manageLikeOnPost } from "../../api/likes/manageLikeOnPost";
import { IPostContext } from "../../contexts/types";
import { PostContext } from "../../contexts/PostContext";
import { useUser } from "../../hooks/useUser";

const Post: React.FC<IPostComponent> = ({
  body,
  title,
  _id,
  likes,
  comments,
  isHomePage,
}) => {
  /**
   * Creates a like on the post
   */
  const { currentPost, setCurrentPost } = useContext<IPostContext>(PostContext);
  const [isLiked, setisLiked] = useState(false);
  const { execute: manageLikeFn } = useAsyncFn(manageLikeOnPost);
  const { id: userId } = useUser();

  useEffect(() => {
    if (likes?.length === 0 || !likes) return;

    console.log(likes, userId);
    setisLiked(likes.some((like: ILike) => like.userid === userId));
  }, [currentPost]);

  const handleLikeOnPost = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const postId = currentPost?._id;
    if (!postId) return;

    if (!isLiked) {
      const newLike = await manageLikeFn(postId, "POST");
      const newLikes = [...(currentPost?.likes ?? []), newLike];
      const newPost: IPost = {
        ...currentPost,
        likes: newLikes,
      };
      setCurrentPost(newPost);
    }

    if (isLiked) {
      const removedLike: ILike = await manageLikeFn(postId, "DELETE");
      const newLikes = currentPost.likes.filter(
        (like: ILike) => like.userid !== removedLike.userid
      );

      const newPost: IPost = {
        ...currentPost,
        likes: newLikes,
      };
      setCurrentPost(newPost);
    }
  };

  return (
    <styled.Container key={_id}>
      <i>r/Yannickbona</i>
      <h1>{title}</h1>
      <p>{body}</p>

      <styled.PostActionsContainer>
        <span className={`likes ${isLiked && "liked"}`}>
          {isLiked ? (
            <AiFillHeart onClick={(e) => handleLikeOnPost(e)} />
          ) : (
            <AiOutlineHeart onClick={(e) => handleLikeOnPost(e)} />
          )}

          {likes?.length}
        </span>

        <span className="comments">
          <AiOutlineComment onClick={() => null} /> {comments?.length}
        </span>
        {isHomePage && (
          <>
            <AiOutlineEdit onClick={() => null} />
            <AiOutlineDelete onClick={() => null} />
          </>
        )}
      </styled.PostActionsContainer>
    </styled.Container>
  );
};

export default Post;
