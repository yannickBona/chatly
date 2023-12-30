import styled from "styled-components";
import { breakpoints, colors, shadows } from "../../themes/tokens";

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

  .hamburger {
    height: 2rem;
    width: 2rem;
  }

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

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
    z-index: 10;
    background: ${colors.white};

    .nav-options {
      position: absolute;
      top: 5rem;
      left: 0;
      width: 100%;
      z-index: -1;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      max-height: 0;
      background: ${colors.white};

      a {
        display: none;
      }

      &:is(.expanded) {
        padding-block: 1rem;
        box-shadow: ${shadows.md};
        max-height: 700px;

        a {
          display: block;
        }
      }
    }
  }
`;
export default { Container };
