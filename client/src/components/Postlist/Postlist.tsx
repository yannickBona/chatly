import React from "react";
import { Link } from "react-router-dom";
import { useMainContext } from "../../contexts/MainContext";
import { IPost } from "../../types";
import Post from "../Post/Post";
import styled from "./styled";
import { useUser } from "../../hooks/useUser";

const Postlist: React.FC = () => {
  const { postList, setPosts } = useMainContext();
  const { setUser } = useUser();

  // if (loading) return <h1>Loading...</h1>;
  // if (error) return <h1>Error!</h1>;

  return (
    <styled.Container>
      {postList && postList.length > 0 ? (
        postList.map((post: IPost) => (
          <Link key={post._id} className="post-card" to={`/post/${post._id}`}>
            <Post isHomePage={true} {...post} />
          </Link>
        ))
      ) : (
        <div>No posts found!</div>
      )}
    </styled.Container>
  );
};

export default Postlist;
