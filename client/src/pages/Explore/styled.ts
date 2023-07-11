import styled from "styled-components";
import { colors } from "../../themes/tokens";

const Container = styled.div`
  background: ${colors.background};
  border-radius: 0.5rem;
  border: 2px solid ${colors.borderColorDark};
  padding: 1.5rem;
  min-height: 200px;
  display: flex;
  margin: 3rem 0;
  flex-direction: column;
  gap: 1rem;
  width: 70%;
  font-size: 18px;
  line-height: 1.5rem;
  text-decoration: none;
  color: ${colors.black};
  position: relative;

  p {
    color: ${colors.neutral};
  }

  .container {
    margin: 1.5rem 0;

    .profiles-list {
      display: flex;
      gap: 1rem;
    }

    .posts-list {
      display: flex;
      gap: 1rem;
      flex-direction: column;
    }

    &.posts a {
      text-decoration: none;
    }

    h3 {
      padding: 1rem 0;
    }
  }
`;
export default { Container };
