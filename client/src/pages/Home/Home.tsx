import React, { useState } from "react";
import Newpost from "../../components/Newpost/Newpost";
import Postlist from "../../components/Postlist/Postlist";
import { IPost } from "../../types";
import styled from "./styled";

const Home = () => {
  const [newPost, setNewPost] = useState<boolean>(false);
  return (
    <styled.Container>
      <Newpost setNewPost={setNewPost} />
      <Postlist newPost={newPost} />
    </styled.Container>
  );
};

export default Home;
