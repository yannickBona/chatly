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
`;

export default { EditForm };
