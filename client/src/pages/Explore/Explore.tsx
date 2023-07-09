import React, { useEffect, useState } from "react";
import styled from "./styled";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Post from "../../components/Post/Post";
import { useAsyncFn } from "../../hooks/useAsync";
import { getRandomPosts } from "../../api/Posts/getRandomPosts";
import { $ResponseData, IPost } from "../../types";
import { Link } from "react-router-dom";

const Explore = () => {
  const [postList, setPostList] = useState<IPost[]>([]);
  const { execute: getSuggestedPostsFn } = useAsyncFn(getRandomPosts);
  useEffect(() => {
    (async () => {
      const response: $ResponseData = await getSuggestedPostsFn();
      if (response.status !== 200) return;
      setPostList(response.data);
    })();
  }, []);
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
        <article className="posts-list">
          {postList.map((post) => (
            <Link to={`/post/${post._id}`}>
              <Post onDelete={() => null} {...post} key={post._id} />
            </Link>
          ))}
        </article>
      </div>
    </styled.Container>
  );
};

export default Explore;
