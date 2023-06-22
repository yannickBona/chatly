import React, { useContext, useEffect, useState } from "react";
import { $ResponseData, IPost } from "../../types";
import styled from "./styled";
import { useAsyncFn } from "../../hooks/useAsync";
import { createPost } from "../../api/Posts/createPosts";
import { IPostContext, IPostListContext } from "../../contexts/types";
import { PostListContext } from "../../contexts/PostListContext";

const Newpost: React.FC = () => {
  const [formData, setFormData] = useState<IPost>({ title: "", body: "" });
  const { postList, setPosts } = useContext<IPostListContext>(PostListContext);
  const { execute: createNewPostFn } = useAsyncFn(createPost);

  /**
   * This creates a new post
   * @param e is the Subimt event
   */
  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response: $ResponseData = await createNewPostFn(formData);
    if (response.status !== 200) return;

    postList?.push(response.data.post);
    setPosts(postList);

    setFormData({ title: "", body: "" });
  };

  return (
    <styled.Container onSubmit={handleCreatePost}>
      <h2>Create Post</h2>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) =>
          setFormData({ ...formData, title: e.currentTarget.value })
        }
        value={formData.title}
      />
      <textarea
        placeholder="Text (optional)"
        onChange={(e) =>
          setFormData({ ...formData, body: e.currentTarget.value })
        }
        value={formData.body}
      />
      <button disabled={formData.title === ""}>Post</button>
    </styled.Container>
  );
};

export default Newpost;
