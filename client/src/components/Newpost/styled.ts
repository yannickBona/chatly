import styled from "styled-components";
import { colors } from "../../themes/tokens";

const Container = styled.form`
  width: 50%;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
  background: ${colors.white};
  border-radius: 0.5rem;
  border: 1px solid ${colors.borderColor};

  h2 {
    align-self: flex-start;
  }

  input[type="text"],
  textarea {
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

  textarea {
    height: 150px;
    resize: none;
  }

  button {
    align-self: flex-end;
    padding: 1rem 2rem;
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

export default { Container };
