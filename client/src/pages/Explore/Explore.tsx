import React from "react";
import styled from "./styled";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Post from "../../components/Post/Post";

const Explore = () => {
  return (
    <styled.Container>
      <h1>Explore</h1>
      <p>Follow and discover other users' content.</p>
      <div className="container profiles">
        <h3>Suggested profiles</h3>
        <div className="profiles-list">
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </div>
      </div>

      <div className="container posts">
        <h3>Posts you might like</h3>
        <div className="posts-list">{/* <Post /> */}</div>
      </div>
    </styled.Container>
  );
};

export default Explore;
