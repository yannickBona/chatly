import styled from "styled-components";
import { colors, shadows } from "../../themes/tokens";

const Container = styled.div`
  padding: 1rem;
  border: 2px solid ${colors.white};
  outline: 2px solid ${colors.borderColorDark};
  width: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: ${colors.borderColor};
  cursor: pointer;
  boredr-radius: 0.5rem;
  transition: all 0.2s ease-in-out;

  .avatar {
    position: relative;
    font-size: 1.5rem;
    display: grid;
    place-items: center;
    background: white;
    border-radius: 50%;
    outline: 2px solid white;

    svg {
      height: 2rem;
      width: 2rem;
      padding: 1rem;
      box-sizing: content-box;
      border: 2px solid ${colors.borderColorDark};
      color: ${colors.neutral};
      border-radius: 50%;
    }
  }

  p {
    text-align: center;
    font-size: 1rem;
    padding: 0.5rem;
    font-weight: bold;
    color: ${colors.black};
    transition: all 0.2s;
  }

  :hover {
    background: ${colors.borderColorDark};
    opacity: 0.9;
    box-shadow: ${shadows.md};

    .avatar {
      background: ${colors.background};
    }
  }

  button {
    margin-top: 0.5rem;
    background-color: ${colors.background};
    cursor: pointer;
    font-family: inherit;
    transition: background-color 200ms ease-in-out;
    outline: 2px solid ${colors.white};
    border: 2px solid ${colors.borderColorDark};
    width: 100%;
    padding: 0.2rem 0;
    color. ${colors.neutral};
    transition: all .2s;

    :hover{
      background:rgba(0,0,0,0.1);
    }
  }
`;
export default { Container };
