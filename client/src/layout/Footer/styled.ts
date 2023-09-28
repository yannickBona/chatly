import styled from "styled-components";
import { colors } from "../../themes/tokens";

export const StyledFooter = styled.footer`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 1.5rem;
  text-align: center;
  font-style: italic;
  letter-spacing: 1px;

  a {
    font-weight: bold;
    color: ${colors.black};
    text-decoration: none;
  }
`;
