import styled from "styled-components";
import { breakpoints, colors } from "../../themes/tokens";

const Container = styled.form`
  display: flex;
  gap: 1rem;

  textarea {
    border: 1px solid ${colors.borderColor};
    background-color: ${colors.background};
    padding: 1rem;
    font-family: inherit;
    width: 100%;
    border-radius: 0.5rem;
    align-self: center;
    height: 150px;
    resize: none;

    &:focus {
      outline: 1px solid ${colors.borderColorDark};
    }
  }

  button {
    padding: 1rem 2rem;
    border: 1px solid ${colors.borderColor};
    background-color: #c9c9c9;
    border-radius: 0.5rem;
    cursor: pointer;
    height: 150px;
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
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;

    button {
      padding: 0.5rem;
      height: auto;
    }
  }
`;

export default { Container };
