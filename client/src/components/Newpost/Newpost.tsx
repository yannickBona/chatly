import React, { useState } from "react";
import { IPost } from "../../types";
import styled from "./styled";
import { useAsyncFn } from "../../hooks/useAsync";
import { createPost } from "../../api/Posts/createPosts";

const Newpost: React.FC = () => {
  const [formData, setFormData] = useState<IPost>({ title: "", body: "" });

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const { value, error, loading } = useAsyncFn(() => createPost(formData));

    // if (error) return alert(error);
    // if (loading) alert("Loading...");
    // if (value) return console.log("PostCreated");
    const response = createPost(formData);
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
