import React, { useState } from "react";
import Newpost from "../../components/Newpost/Newpost";
import Postlist from "../../components/Postlist/Postlist";
import { IPost } from "../../types";
import styled from "./styled";

const Home = () => {
  return (
    <styled.Container>
      <Newpost />
      <Postlist />
    </styled.Container>
  );
};

export default Home;
