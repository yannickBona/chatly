import styled from "styled-components";
import { colors } from "../../themes/tokens";

const Container = styled.div`
  background: ${colors.white};
  border-radius: 0.5rem;
  border: 1px solid ${colors.borderColorDark};
  padding: 1.5rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  font-size: 18px;
  line-height: 1.5rem;
  text-decoration: none;
  color: ${colors.black};
  cursor: pointer;
  position: relative;

  p {
    color: ${colors.neutral};
  }

  :hover {
    outline: 1px solid ${colors.neutral};
  }
`;

const PostActionsContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  gap: 1rem;

  svg:hover {
    transform: scale(1.2);
  }

  > svg:nth-child(1) {
    color: red;
  }
`;
export default { Container, PostActionsContainer };
