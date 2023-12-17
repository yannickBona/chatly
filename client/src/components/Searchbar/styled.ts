import styled from "styled-components";
import { colors } from "../../themes/tokens";

export const StyledSearchbar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  input[type="search"] {
    border: 1px solid ${colors.borderColor};
    background-color: ${colors.background};
    padding: 0.5rem;
    font-family: inherit;
    width: fit-content;
    border-radius: 0.5rem;
    font-size: 1rem;
    width: 50%;

    &:focus {
      outline: 1px solid ${colors.borderColorDark};
    }
  }
`;
