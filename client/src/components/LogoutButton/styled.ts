import styled from "styled-components";
import { breakpoints, colors } from "../../themes/tokens";

const Button = styled.button`
  align-self: flex-end;
  padding: 1rem 1.5rem;
  border: 1px solid ${colors.borderColor};
  background-color: #c9c9c9;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 200ms ease-in-out;
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  color: ${colors.black};

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

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

export default { Button };
