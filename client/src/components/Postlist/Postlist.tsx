import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../../api/Posts/deletePost";
import { getPosts } from "../../api/Posts/getPosts";
import { useAsync } from "../../hooks/useAsync";
import { IPost } from "../../types";
import styled from "./styled";

interface IPostList {
  // setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  // posts: IPost[] | undefined;
  newPost: boolean;
}

const Postlist: React.FC<IPostList> = ({ newPost }) => {
  const [posts, setPosts] = useState<IPost[]>();
  const { loading, error, value } = useAsync(() => getPosts(), [newPost]);
  const postList: IPost[] | undefined = value;

  const handleDelete = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    const response = await deletePost(id);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error!</h1>;
  return (
    <styled.Container>
      {postList?.map((post: IPost) => (
        <Link className="post" key={post._id} to={`/post/${post._id}`}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <span onClick={(e) => handleDelete(e, post._id!)}>x</span>
        </Link>
      ))}
    </styled.Container>
  );
};

export default Postlist;
