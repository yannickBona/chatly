import styled from "styled-components";
import { colors } from "../../themes/tokens";

const Container = styled.form<{ showForm: boolean }>`
  // transform: ${({ showForm }) => (showForm ? "scale(1)" : "scale(0)")};
  transition: all 100ms ease-in-out;
  width: 70%;
  align-self: center;
  // display: ${({ showForm }) => (showForm ? "flex" : "none")};
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

const showFormButton = styled.span`
background: ${colors.neutral};
border-radius 50%;
width: 4rem;
height: 4rem;
border: 2px solid white;
display: grid;
font-size: 1.5rem;
color: ${colors.white};
place-items: center;
cursor: pointer;
transition: all 200ms ease-in-out;


:active{
  transform: scale(0.8);
}
`;

export default { Container, showFormButton };
