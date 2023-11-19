import styled from "styled-components";
import { breakpoints, colors } from "../../themes/tokens";

export const StyledContainer = styled.main`
  background: ${colors.background};
  border-radius: 0.5rem;
  border: 2px solid ${colors.borderColorDark};
  padding: 1.5rem;
  display: flex;
  margin: 3rem 0;
  flex-direction: column;
  gap: 1rem;
  width: 70%;
  font-size: 18px;
  line-height: 1.5rem;
  text-decoration: none;
  color: ${colors.black};
  position: relative;

  h1 {
    font-size: 2rem;
    color
  }

  p{
    padding: 1.5rem 0;
    color: ${colors.neutral};

    a{
      color: ${colors.black};
      text-decoration: none;

      &:hover{
      text-decoration: underline;
      }
    }
  }

  .back-button{
    top: 1.5rem;
    left: -5rem;
    font-size: 1.5rem;
    cursor: pointer;

    &:active{
      transform: scale(0.95);
    }

    @media(max-width: ${breakpoints.mobile}){
      left:1rem;
      bottom: 2rem;
      top: unset;

      position: fixed;
      z-index: 1;
    }
  }


  .cards-container{
    display: flex;
    width: 100%;
    gap: 1rem;
    margin: 2rem 0;
  }


  @media(max-width: ${breakpoints.mobile}){
    width: 90%;

    h1{
      font-size: 1.5rem;
      text-align: center;
    }

    .cards-container{
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    p{
      text-align: center;
    }
  }
`;
