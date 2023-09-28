import styled from "styled-components";
import { colors } from "../../themes/tokens";

export const StyledLoader = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  position: relative;

  .backdrop {
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }

  div:not(.backdrop) {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    background-image: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    animation: bounce 2s 1s linear infinite;

    &:nth-child(1) {
      background: ${colors.borderColor};
    }

    &:nth-child(2) {
      background: ${colors.borderColor};
      animation-delay: 0.1s;
    }

    &:nth-child(3) {
      background: ${colors.borderColor};
      animation-delay: 0.3s;
    }

    &:nth-child(4) {
      background: ${colors.borderColor};
      animation-delay: 0.5s;
    }
  }

  .spinner {
    width: 100px;
    height: 100px;
    background: transparent;
    border: 1rem solid ${colors.borderColor};
    border-top: 1rem solid ${colors.black};
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes bounce {
      0%,
      50%,
      100% {
        transform: scale(1);
        filter: blur(0px);
      }
      25% {
        transform: scale(0.6);
        filter: blur(3px);
      }
      75% {
        filter: blur(3px);
        transform: scale(1.4);
      }
    }
  }
`;
