import React, { useEffect, useState } from "react";
import styled from "./styled";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Post from "../../components/Post/Post";
import { useAsyncFn } from "../../hooks/useAsync";
import { getRandomPosts } from "../../api/Posts/getRandomPosts";
import { $ResponseData, IPost } from "../../types";
import { Link } from "react-router-dom";
import { getSuggestedUsers } from "../../api/User/getSuggestedUsers";

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
        console.log(suggestedUsersResponse);
      }

      if (suggestedPostsResponse.status === 200) {
        setPostList(suggestedPostsResponse.data);
      }
    })();
  }, []);

  console.log(users, postList);
  return (
    <styled.Container>
      <h1>Explore</h1>
      <p>Follow and discover other users' content.</p>
      <div className="container profiles">
        <h3>Suggested profiles</h3>
        <div className="profiles-list">
          {users.map((user, idx) => (
            <ProfileCard username={user} key={`${user}-${idx}`} />
          ))}
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
