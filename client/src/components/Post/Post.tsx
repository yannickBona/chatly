import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineUser,
} from "react-icons/ai";
import { $ResponseData, ILike, IPostComponent } from "../../types";
import styled from "./styled";
import { useAsyncFn } from "../../hooks/useAsync";
import { manageLikeOnPost } from "../../api/likes/manageLikeOnPost";
import {
  IAuthContext,
  IPostContext,
  IPostListContext,
} from "../../contexts/types";
import { PostContext } from "../../contexts/PostContext";
import { useUser } from "../../hooks/useUser";
import { formatDate } from "../../helpers/dateFormat";
import Newpost from "../Newpost/Newpost";
import EditForm from "../EditForm/EditForm";
import { useLocation, useParams } from "react-router-dom";
import { PostListContext } from "../../contexts/PostListContext";
import { AuthContext } from "../../contexts/AuthContext";

const Post: React.FC<IPostComponent> = ({
  body,
  title,
  _id,
  likes,
  comments,
  createdAt,
  isHomePage,
  onDelete,
  owner,
}) => {
  /**
   * Creates a like on the post
   */
  const { currentPost } = useContext<IPostContext>(PostContext);
  const { setPosts } = useContext<IPostListContext>(PostListContext);
  const { user } = useContext<IAuthContext>(AuthContext);
  const [isLiked, setisLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes?.length ?? 0);
  const [editMode, setEditMode] = useState(false);
  const { execute: manageLikeFn } = useAsyncFn(manageLikeOnPost);
  const username = useUser();

  const isOwner = user?.username === owner;

  const { id: postIdParam } = useParams();
  const postId = currentPost?._id ?? _id ?? postIdParam;
  const postedDate = currentPost?.createdAt
    ? currentPost?.createdAt.toString()
    : createdAt?.toString();

  useEffect(() => {
    if (likes?.length === 0 || !likes) return;
    setisLiked(likes.some((like: string) => like === username));
    setCurrentLikes(likes.length);
  }, [likes]);

  /**
   * Manages likes on post
   * @param e
   * @returns
   */
  const handleLikeOnPost = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!postId) return;

    if (!isLiked) {
      const response: $ResponseData = await manageLikeFn(postId, "POST");

      if (response.status !== 200) return;
      setPosts([]);

      setCurrentLikes((prevLikes) => prevLikes + 1);
      setisLiked(true);
      return;
    }

    if (isLiked) {
      const response: $ResponseData = await manageLikeFn(postId, "DELETE");
      if (response.status !== 200) return;

      setPosts([]);

      setCurrentLikes((prevLikes) => prevLikes - 1);
      setisLiked(false);
    }
  };

  /**
   * Enables/disables Edit Mode on post
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
        <i>
          Posted By <b>{owner ?? "Anonymous User"}</b>
          {isOwner && " (you)"}
        </i>
        · <span className="post-date">{formatDate(postedDate)}</span>
      </div>
      <h1>{title}</h1>

      {isOwner && editMode ? (
        <EditForm postId={postId} setEditMode={setEditMode} body={body!} />
      ) : (
        <p>{body}</p>
      )}

      <styled.PostActionsContainer>
        <span className="likes">
          {isLiked ? (
            <AiFillHeart className="filled" onClick={handleLikeOnPost} />
          ) : (
            <AiOutlineHeart onClick={handleLikeOnPost} />
          )}

          {currentLikes}
        </span>

        <span className="comments">
          <AiOutlineComment onClick={() => null} /> {comments?.length}
        </span>

        {isOwner &&
          (isHomePage ? (
            <AiOutlineDelete onClick={(e) => onDelete(e, _id!)} />
          ) : (
            <AiOutlineEdit onClick={handleEditMode} />
          ))}
      </styled.PostActionsContainer>
    </styled.Container>
  );
};

export default Post;
