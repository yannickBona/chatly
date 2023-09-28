import Newpost from "../../components/Newpost";
import Postlist from "../../components/Postlist";
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
