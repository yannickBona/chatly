import styled from "styled-components";
import { colors } from "../../themes/tokens";

export const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${colors.borderColor};
  background-color: #c9c9c9;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 200ms ease-in-out;

  :hover,
  :focus,
  :active {
    background-color: ${colors.borderColorDark};
  }

  &[disabled] {
    cursor: no-drop;
  }

  :active:not([disabled]) {
    transform: scale(0.95);
  }
`;
