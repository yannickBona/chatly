import styled from "styled-components";
import { colors } from "../../themes/tokens";

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem;
  gap: 2rem;

  .back-button {
    position: absolute;
    left: 3rem;
    text-decoration: none;
    font-size: 1.5rem;
    top: 3rem;
  }
`;

const CommentsSection = styled.div`
  background: ${colors.white};
  border-radius: 0.5rem;
  border: 1px solid ${colors.borderColorDark};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  font-size: 18px;
  line-height: 1.5rem;
  color: ${colors.black};
  cursor: pointer;
  position: relative;

  :has(textarea:active, textarea:focus, button:active, button:focus) {
    outline: none;
  }

  :hover {
    outline: 1px solid ${colors.neutral};
  }

  h3 {
    align-self: flex-start;
    font-size: 2rem;
  }
`;

export default { Container, CommentsSection };
