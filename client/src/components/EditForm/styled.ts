import styled from "styled-components";
import { breakpoints, colors } from "../../themes/tokens";

export const EditForm = styled.form<{ isComment: boolean }>`
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
    min-height: ${(p) => (p.isComment ? "50" : "150")}px;
    width: 100%;
  }

  .button-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    > button {
      cursor: pointer;
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
