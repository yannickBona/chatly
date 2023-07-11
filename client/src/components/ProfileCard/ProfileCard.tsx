import React, { useContext, useState } from "react";
import styled from "./styled";
import { AiOutlineUser } from "react-icons/ai";
import { useUser } from "../../hooks/useUser";
import { useAsyncFn } from "../../hooks/useAsync";
import { follow, unfollow } from "../../api/User/manageFollow";
import { $ResponseData } from "../../types";
import { TUser } from "../../contexts/types";

const ProfileCard: React.FC<{ username: string }> = ({ username }) => {
  const { execute: manageFollow } = useAsyncFn(follow);
  const { execute: manageUnfollow } = useAsyncFn(unfollow);

  const { user, setUser } = useUser();

  const [isFollowing, setIsFollowing] = useState(
    user?.followed.some((user) => user === username)
  );

  const handleFollow = async () => {
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
    <styled.Container>
      <span className="avatar">
        <AiOutlineUser />
      </span>
      <p>{username}</p>
      <button className={isFollowing ? "filled" : ""} onClick={handleFollow}>
        {isFollowing ? "Already following" : "Follow"}
      </button>
    </styled.Container>
  );
};

export default ProfileCard;
