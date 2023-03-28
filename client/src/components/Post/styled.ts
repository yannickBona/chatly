import styled from "styled-components";
import { colors } from "../../themes/tokens";

const Container = styled.div`
  background: ${colors.white};
  border-radius: 0.5rem;
  border: 1px solid ${colors.borderColorDark};
  padding: 1.5rem;
  min-height: 200px;
  width: 60%;
  font-size: 22px;
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
export default { Container };
