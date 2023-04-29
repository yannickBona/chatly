import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineUser,
} from "react-icons/ai";
import { ILike, IPost, IPostComponent } from "../../types";
import styled from "./styled";
import { useAsyncFn } from "../../hooks/useAsync";
import { manageLikeOnPost } from "../../api/likes/manageLikeOnPost";
import { IPostContext, IPostListContext } from "../../contexts/types";
import { PostContext } from "../../contexts/PostContext";
import { useUser } from "../../hooks/useUser";
import { PostListContext } from "../../contexts/PostListContext";
import { formatDate } from "../../helpers/dateFormat";
import Newpost from "../Newpost/Newpost";
import EditForm from "../EditForm/EditForm";

const Post: React.FC<IPostComponent> = ({
  body,
  title,
  _id,
  likes,
  comments,
  createdAt,
  isHomePage,
  onDelete,
}) => {
  /**
   * Creates a like on the post
   */
  const { currentPost, setCurrentPost } = useContext<IPostContext>(PostContext);
  const { postList, setPosts } = useContext<IPostListContext>(PostListContext);
  const [isLiked, setisLiked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { execute: manageLikeFn } = useAsyncFn(manageLikeOnPost);
  const { id: userId } = useUser();

  useEffect(() => {
    if (likes?.length === 0 || !likes) return;
    setisLiked(likes.some((like: ILike) => like.userid === userId));
  }, []);

  /**
   * Manages likes on post
   * @param e
   * @returns
   */
  const handleLikeOnPost = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.preventDefault();

    const postId = currentPost?._id ?? _id;
    if (!postId) return;

    if (!isLiked) {
      const newLike: ILike = await manageLikeFn(postId, "POST");
      const newLikes = [...(likes ?? []), newLike];

      // Manages likes from post page
      if (currentPost) {
        setCurrentPost((prevPost: IPost | undefined) => {
          return {
            ...prevPost,
            likes: newLikes,
          };
        });
      }

      // Manages likes from home page
      if (postList) {
        const idx = postList.findIndex((post) => post._id === postId);
        const updatedPostList = [...postList];
        updatedPostList[idx] = { ...updatedPostList[idx], likes: newLikes };
        setPosts(updatedPostList);
      }

      setisLiked(true);
    }

    if (isLiked) {
      const removedLike: ILike = await manageLikeFn(postId, "DELETE");
      const newLikes = likes?.filter(
        (like: ILike) => like.userid !== removedLike.userid
      );

      if (currentPost) {
        setCurrentPost((prevPost: IPost | undefined) => {
          return {
            ...prevPost,
            likes: newLikes,
          };
        });
      }

      // Manages likes from home page
      if (postList) {
        const idx = postList.findIndex((post) => post._id === postId);
        const updatedPostList = postList.splice(idx, 1);
        setPosts(updatedPostList);
      }

      setisLiked(false);
    }
  };

  /**
   * Handles Edit Mode on post
   */
  const handleEditMode = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    setEditMode((prevMode) => !prevMode);
  };

  return (
    <styled.Container key={_id}>
      <div className="owner">
        <span className="comment__user-avatar">
          <AiOutlineUser />
        </span>
        <i>Posted By yannickBona</i>·{" "}
        <span className="post-date">
          {formatDate(
            currentPost?.createdAt
              ? currentPost?.createdAt.toString()
              : createdAt?.toString()
          )}
        </span>
      </div>
      <h1>{title}</h1>

      {editMode ? <EditForm body={body!} /> : <p>{body}</p>}

      <styled.PostActionsContainer>
        <span className="likes">
          {isLiked ? (
            <AiFillHeart className="filled" onClick={handleLikeOnPost} />
          ) : (
            <AiOutlineHeart onClick={handleLikeOnPost} />
          )}

          {likes?.length}
        </span>

        <span className="comments">
          <AiOutlineComment onClick={() => null} /> {comments?.length}
        </span>

        {isHomePage ? (
          <AiOutlineDelete onClick={(e) => onDelete(e, _id!)} />
        ) : (
          <AiOutlineEdit onClick={handleEditMode} />
        )}
      </styled.PostActionsContainer>
    </styled.Container>
  );
};

export default Post;
