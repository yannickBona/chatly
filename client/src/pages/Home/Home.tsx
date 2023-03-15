import React from "react";
import Newpost from "../../components/Newpost/Newpost";
import Postlist from "../../components/Postlist/Postlist";
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
