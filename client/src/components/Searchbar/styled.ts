import styled from "styled-components";
import { breakpoints, colors, shadows } from "../../themes/tokens";

export const StyledSearchbar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  position: relative;

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

  .search-results {
    position: absolute;
    top: 100%;
    margin-top: 0.25rem;
    right: 4rem;
    width: 60%;
    max-height: 40rem;
    overflow-y: auto;
    box-shadow: ${shadows.md};
    background: ${colors.white};
    border-radius: 0.25rem;

    p {
      padding: 1rem;
      font-style: italic;
      font-size: 1rem;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    margin-top: 2rem;
    input[type="search"] {
      width: 100%;
    }
  }
`;
