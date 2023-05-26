import styled from "styled-components";
import { colors } from "../../themes/tokens";

const LoginForm = styled.form`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
  background: ${colors.white};
  border-radius: 0.5rem;
  border: 1px solid ${colors.borderColor};

  h1 {
    text-align: center;
    font-size: 40px;
  }

  input {
    border: 1px solid ${colors.borderColor};
    background-color: ${colors.background};
    padding: 1rem;
    font-family: inherit;
    width: 100%;
    border-radius: 0.5rem;
    align-self: center;

    &:focus {
      outline: 1px solid ${colors.borderColorDark};
    }
  }

  button {
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
  }
`;

export default { LoginForm };
