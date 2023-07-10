import React, { useContext } from "react";
import { IAuthContext } from "../../contexts/types";
import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useContext<IAuthContext>(AuthContext);

  return (
    <div>
      <h1>Profile Overview</h1>
      <div className="profile-info">
        <h3>{user.username}</h3>
        <h3>Posts: 0</h3>
        <h3>Followers: 0</h3>
        <h3>Followed: 0</h3>
      </div>

      <h3>Your posts</h3>
      <div className="post-list"></div>
    </div>
  );
};

export default Profile;
