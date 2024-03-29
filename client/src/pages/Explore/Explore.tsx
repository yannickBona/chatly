import React, { useEffect, useState } from "react";
import styled from "./styled";
import ProfileCard from "../../components/ProfileCard";
import Post from "../../components/Post";
import { useAsyncFn } from "../../utils/hooks/useAsync";
import { getRandomPosts } from "../../services/api/Posts/getRandomPosts";
import { $ResponseData, IPost } from "../../types";
import { Link } from "react-router-dom";
import { getSuggestedUsers } from "../../services/api/User/getSuggestedUsers";
import Searchbar from "../../components/Searchbar";

const Explore = () => {
  const [postList, setPostList] = useState<IPost[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const { execute: getSuggestedPostsFn } = useAsyncFn(getRandomPosts);
  const { execute: getSuggestedUsersFn } = useAsyncFn(getSuggestedUsers);

  useEffect(() => {
    (async () => {
      const [suggestedUsersResponse, suggestedPostsResponse] =
        await Promise.all([getSuggestedUsersFn(), getSuggestedPostsFn()]);

      if (suggestedUsersResponse.status === 200) {
        setUsers(suggestedUsersResponse.data);
      }

      if (suggestedPostsResponse.status === 200) {
        setPostList(suggestedPostsResponse.data);
      }
    })();
  }, []);

  return (
    <styled.Container>
      <div className="header">
        <div className="title">
          <h1>Explore</h1>
          <p>Follow and discover other users' content.</p>
        </div>
        <Searchbar />
      </div>
      <div className="container profiles">
        <h3>Suggested profiles</h3>
        <div className="profiles-list">
          {users.length ? (
            users.map((user, idx) => (
              <ProfileCard username={user} key={`${user}-${idx}`} />
            ))
          ) : (
            <p>No suggested users for today... come back later!</p>
          )}
        </div>
      </div>

      <div className="container posts">
        <h3>Posts you might like</h3>
        <article className="posts-list">
          {postList.length ? (
            postList.map((post) => (
              <Link to={`/post/${post._id}`} key={post._id}>
                <Post
                  setSuggestedPosts={setPostList}
                  suggestedPosts={postList}
                  {...post}
                />
              </Link>
            ))
          ) : (
            <p>No suggested posts for today...</p>
          )}
        </article>
      </div>
    </styled.Container>
  );
};

export default Explore;
