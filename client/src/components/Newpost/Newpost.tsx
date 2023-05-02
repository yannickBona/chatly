import React, { useContext, useEffect, useState } from "react";
import { $ResponseData } from "../../types";
import styled from "./styled";
import { useAsyncFn } from "../../hooks/useAsync";
import { createPost } from "../../api/Posts/createPosts";
import { IPostListContext } from "../../contexts/types";
import { PostListContext } from "../../contexts/PostListContext";
import { useUser } from "../../hooks/useUser";

const Newpost: React.FC = () => {
  const [formData, setFormData] = useState<{ title: string; body: string }>({
    title: "",
    body: "",
  });
  // const [showForm, setShowForm] = useState(false);
  const { setPosts } = useContext<IPostListContext>(PostListContext);
  const { execute: createNewPostFn } = useAsyncFn(createPost);
  const { setUser } = useUser();

  /**
   * This creates a new post
   * @param e is the Subimt event
   */
  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response: $ResponseData = await createNewPostFn(formData);
    if (response.status !== 200) return;

    const newPost = response.data.post;

    setPosts((prevPost) => (prevPost ? [newPost, ...prevPost] : [newPost]));

    setUser((prevUser) => {
      if (!prevUser) return null;
      return { ...prevUser, postsUploaded: prevUser?.postsUploaded + 1 };
    });

    setFormData({ title: "", body: "" });
  };

  return (
    <styled.Container showForm={false} onSubmit={handleCreatePost}>
      <h2>Share your thoughts!</h2>
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

    // <styled.showFormButton onClick={() => setShowForm((prev) => !prev)}>
    // </styled.showFormButton>
  );
};

export default Newpost;
