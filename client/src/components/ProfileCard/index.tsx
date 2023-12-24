import React, { useContext, useState } from "react";
import styled from "./styled";
import { AiOutlineUser } from "react-icons/ai";
import { useUser } from "../../utils/hooks/useUser";
import { useAsyncFn } from "../../utils/hooks/useAsync";
import { follow, unfollow } from "../../services/api/User/manageFollow";
import { $ResponseData } from "../../types";
import { Link, useNavigate } from "react-router-dom";

const ProfileCard: React.FC<{ username: string }> = ({ username }) => {
  const { execute: manageFollow } = useAsyncFn(follow);
  const { execute: manageUnfollow } = useAsyncFn(unfollow);

  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [isFollowing, setIsFollowing] = useState(
    user?.followed.some((user) => user === username)
  );

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (username === user?.username) return;

    e.stopPropagation();
    if (!isFollowing) {
      const response: $ResponseData = await manageFollow(username);
      if (response.status !== 200) return;
      setIsFollowing(true);

      setUser((prevUser) => {
        if (!prevUser) return null;
        const updatedFollowed = [...(prevUser.followed || []), username];
        return {
          ...prevUser,
          followed: updatedFollowed,
        };
      });
    }

    if (isFollowing) {
      const response: $ResponseData = await manageUnfollow(username);
      if (response.status !== 200) return;
      setIsFollowing(false);

      setUser((prevUser) => {
        if (!prevUser) return null;
        const updatedFollowed = prevUser.followed.filter(
          (user) => user !== username
        );

        return {
          ...prevUser,
          followed: updatedFollowed,
        };
      });
      return;
    }
  };

  return (
    <a onClick={() => navigate(`/profile/${username}?canGoBack=1`)}>
      <styled.Container>
        <span className="avatar">
          <AiOutlineUser />
        </span>
        <p>{username}</p>
        <button className={isFollowing ? "filled" : ""} onClick={handleFollow}>
          {username === user?.username
            ? "You"
            : isFollowing
            ? "Already following"
            : "Follow"}
        </button>
      </styled.Container>
    </a>
  );
};

export default ProfileCard;
