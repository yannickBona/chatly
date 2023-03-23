import React, { useEffect, useState } from "react";
import { IPost } from "../../types";
import styled from "./styled";
import { useAsyncFn } from "../../hooks/useAsync";
import { createPost } from "../../api/Posts/createPosts";

interface INewPost {
  // setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  // postList?: IPost[] | undefined;
  setNewPost: React.Dispatch<React.SetStateAction<boolean>>;
}
const Newpost: React.FC<INewPost> = ({ setNewPost }) => {
  const [formData, setFormData] = useState<IPost>({ title: "", body: "" });
  const { loading, error, execute: createNewPostFn } = useAsyncFn(createPost);

  /**
   * This creates a new post
   * @param e is the Subimt event
   */
  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createNewPostFn(formData);
    setNewPost(true);

    // let newPostList: IPost[];
    // postList
    //   ? (newPostList = [...postList, formData])
    //   : (newPostList = [formData]);

    // setPostList(newPostList);
    setFormData({ title: "", body: "" });
  };

  return (
    <styled.Container onSubmit={(e) => handleCreatePost(e)}>
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
