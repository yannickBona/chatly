import styled from "styled-components";
import { colors } from "../../themes/tokens";

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input[type="text"],
  textarea {
    border: 1px solid ${colors.borderColor};
    background-color: ${colors.background};
    padding: 0.5rem;
    font-family: inherit;
    width: fit-content;
    border-radius: 0.5rem;

    &:focus {
      outline: 1px solid ${colors.borderColorDark};
    }
  }
  textarea {
    resize: none;
    min-height: 150px;
    width: 100%;
  }

  .button-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
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

    button:first-child {
      padding: 0 1rem;
      background: ${colors.white};
      color: #05bfdb;
      border: none;
      align-self: center;

      :hover {
        color: #537fe7;
      }
    }
  }
`;

export default { EditForm };
