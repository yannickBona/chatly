import styled from "styled-components";
import { colors, shadows } from "../../themes/tokens";

const Container = styled.nav`
  background: ${colors.white};
  position: sticky;
  top: 0;
  box-shadow: ${shadows.sm};
  width: 100%;
  padding: 1rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99999;

  .logo {
    display: flex;
    align-items: center;
    font-size: 3rem;
    color: ${colors.neutral};
    font-weight: bold;
    font-family: "Bangers", cursive;
    letter-spacing: 0.25rem;
    text-decoration: none;
    transition: all ease-in-out 300ms;

    :hover {
      color: ${colors.black};
    }
  }

  .nav-options {
    display: flex;
    gap: 3rem;
    font-size: 1.5rem;

    a {
      color: ${colors.neutral};
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.25rem;
      opacity: 1;
      transition: all ease-in-out 100ms;
      font-weight: bold;

      &.selected {
        color: ${colors.black};
      }

      :hover {
        color: ${colors.black};
      }
    }

    :hover a:not(:hover) {
      opacity: 0.4;
    }
  }
`;
export default { Container };
