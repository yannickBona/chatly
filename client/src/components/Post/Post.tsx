import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineUser,
} from "react-icons/ai";
import { $ResponseData, IPostComponent } from "../../types";
import styled from "./styled";
import { useAsyncFn } from "../../hooks/useAsync";
import { manageLikeOnPost } from "../../api/likes/manageLikeOnPost";
import { IPostContext, IMainContext } from "../../contexts/types";
import { PostContext } from "../../contexts/PostContext";
import { useUser } from "../../hooks/useUser";
import { formatDate } from "../../helpers/dateFormat";
import EditForm from "../EditForm/EditForm";
import { useParams } from "react-router-dom";
import { MainContext } from "../../contexts/MainContext";
import DeletePostModal from "../DeletePostModal";

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
  suggestedPosts,
  setSuggestedPosts,
}) => {
  /**
   * Creates a like on the post
   */
  const { currentPost } = useContext<IPostContext>(PostContext);
  const { setPosts, postList, setOpenModal, openModal } =
    useContext<IMainContext>(MainContext);
  const [isLiked, setisLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes?.length ?? 0);
  const [editMode, setEditMode] = useState(false);
  const { execute: manageLikeFn } = useAsyncFn(manageLikeOnPost);
  const { user } = useUser();

  const isOwner = user?.username === owner;

  const { id: postIdParam } = useParams();
  const postId = currentPost?._id ?? _id ?? postIdParam;
  const postedDate = currentPost?.createdAt
    ? currentPost?.createdAt.toString()
    : createdAt?.toString();

  useEffect(() => {
    if (likes?.length === 0 || !likes) return;
    setisLiked(likes.some((like: string) => like === user?.username));
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

    if (!postId || !postList || !user) return;

    const httpMethod = isLiked ? "DELETE" : "POST";

    const updatedPostList = suggestedPosts
      ? [...suggestedPosts]
      : [...postList];

    const postIdx = updatedPostList.findIndex((post) => post._id === postId);

    if (currentPost && postIdx === -1) {
      handleSuggestedPostLike(httpMethod);
    }

    if (postIdx === -1) return; // Post not found in any list

    const response = await manageLikeFn(postId, httpMethod);
    if (response.status !== 200) return;

    // Remove or add like to the Post depending on isLiked
    const updatedPost = {
      ...updatedPostList[postIdx],
      likes: !isLiked
        ? [...updatedPostList[postIdx].likes, user.username]
        : updatedPostList[postIdx].likes.filter(
            (like) => like !== user.username
          ),
    };

    updatedPostList[postIdx] = updatedPost;

    // If explore page update suggested list, else update the feed list
    const updatePosts =
      suggestedPosts && setSuggestedPosts ? setSuggestedPosts : setPosts;

    updatePosts(updatedPostList);
    updateLikes();
  };

  /**
   * Handles like on a post marked as suggested
   * @returns void
   */
  const handleSuggestedPostLike = async (method: "POST" | "DELETE") => {
    const response: $ResponseData = await manageLikeFn(postId, method);
    if (response.status !== 200) return;
    updateLikes();
  };

  const updateLikes = () => {
    const updatedLikes = !isLiked ? 1 : -1;
    setCurrentLikes((prevLikes) => prevLikes + updatedLikes);
    setisLiked((isLiked) => !isLiked);
  };

  /**
   * Enables/disables Edit Mode on post
   */
  const handleEditMode = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    setEditMode((prevMode) => !prevMode);
  };

  return (
    <styled.Container key={`post-${_id}`}>
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
            <AiOutlineDelete
              onClick={(e) => {
                e.preventDefault();
                setOpenModal("delete-post");
              }}
            />
          ) : (
            <AiOutlineEdit onClick={handleEditMode} />
          ))}
      </styled.PostActionsContainer>
    </styled.Container>
  );
};

export default Post;
