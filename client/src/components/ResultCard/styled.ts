import styled from "styled-components";
import { colors } from "../../themes/tokens";

export const StyledResultCard = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  cursor: pointer;

  &:hover {
    background: ${colors.inputColor};
  }

  p {
    padding: 0 !important;
    margin: 0;
  }
  button {
    height: fit-content;
  }

  .avatar {
    position: relative;
    font-size: 1rem;
    display: grid;
    place-items: center;
    background: white;
    border-radius: 50%;
    outline: 2px solid white;

    svg {
      height: 1.5rem;
      width: 1.5rem;
      padding: 0.5rem;
      box-sizing: content-box;
      border: 2px solid ${colors.borderColorDark};
      color: ${colors.neutral};
      border-radius: 50%;
    }
  }
`;
