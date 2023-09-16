import React, { useContext, useEffect, useState } from "react";
import { IAuthContext, IMainContext } from "../../contexts/types";
import { AuthContext } from "../../contexts/AuthContext";
import styled from "./styled";
import { AiOutlineUser } from "react-icons/ai";
import { MainContext } from "../../contexts/MainContext";
import { IPost } from "../../types";
import { Link, useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import { deletePost } from "../../api/Posts/deletePost";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { useUser } from "../../hooks/useUser";

const Profile = () => {
  const { user } = useContext<IAuthContext>(AuthContext);
  const { postList } = useContext<IMainContext>(MainContext);

  const { username } = useParams();
  // TODO: set profile via API
  const profile = user;

  const ownerPosts =
    postList?.filter((post) => post.owner === profile?.username) ?? [];

  return profile ? (
    <styled.Container>
      <h1>Profile Overview | {user?.username}</h1>
      <div className="profile-info">
        <span className="avatar">
          <AiOutlineUser />
        </span>
        <h2>@{user?.username}</h2>
        <section className="profile-details">
          <h3>
            <span>{user?.postsUploaded}</span>
            <br />
            Posts
          </h3>
          <h3>
            <span>{user?.followers.length}</span> <br />
            Followers
          </h3>
          <h3>
            <span>{user?.followed.length}</span>
            <br />
            Followed
          </h3>
        </section>
        <section className="profile-actions">
          <button>Modify Profile</button>
          <Link to="/explore">Add friends</Link>
        </section>
      </div>

      <h3>
        Your posts [<Link to="/">+New post</Link>]
      </h3>
      <div className="post-list">
        {ownerPosts.map((post) => (
          <Link to={`/post/${post._id}`} key={post._id}>
            <Post {...post} />
          </Link>
        ))}
      </div>
      <LogoutButton />
    </styled.Container>
  ) : (
    <p>Profiile not found...</p>
  );
};

export default Profile;
