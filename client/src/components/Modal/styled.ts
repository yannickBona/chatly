import styled from "styled-components";
import { breakpoints, colors } from "../../themes/tokens";

export const StyledModal = styled.div`
  background: rgba(0, 0, 0, 0.6);
  height: 100dvh;
  width: 100dvw;
  max-width: 100%;
  max-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  display: grid;
  place-items: center;
`;

export const StyledBackDrop = styled.div`
  position: fixed;
  inset: 0;
`;

export const StyledModalContainer = styled.div`
  max-height: 50vh;
  max-width: 60vw;
  position: relative;
  background: ${colors.white};
  border: 1px solid ${colors.borderColor};
  background-color: ${colors.background};
  font-family: inherit;
  border-radius: 0.5rem;
  align-self: center;
  animation: fadeAnimation 0.3s;

  @keyframes fadeAnimation {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 90vw;
    max-height: fit-content;
  }
`;

export const StyledModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 1rem;
  border-bottom: solid 1px ${colors.borderColor};
  position: sticky;
  top: 0;

  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
  }

  svg {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
    width: 1.5rem;
    color: ${colors.black};
  }

  @media (max-width: ${breakpoints.mobile}) {
    .title {
      font-size: 1.25rem;
    }

    svg {
      height: 1.25rem;
      width: 1.25rem;
      color: ${colors.black};
    }
  }
`;
export const StyledModalContent = styled.main`
  display: flex;
  flex-direction: column;
  //   align-items: {({ alignItems }) => alignItems};
  //justify-content: center;
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 2rem 1rem;

  @media (max-width: ${breakpoints.mobile}) {
    max-height: fit-content;
    display: table-cell;
  }
`;

export const StyledModalFooter = styled.footer`
  display: flex;
  padding: 1rem;
  position: sticky;
  bottom: 0;
  border-top: solid 1px ${colors.borderColor};
  align-items: center;
  gap: 1.5rem;
  justify-content: flex-end;

  span {
    color: red;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;
