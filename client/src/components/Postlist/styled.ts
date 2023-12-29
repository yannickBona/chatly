import styled from "styled-components";
import { breakpoints, colors } from "../../themes/tokens";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem 1rem;
  position: relative;


  .post-card {
      background: ${colors.white};
      border-radius: 0.5rem;
      border: 1px solid ${colors.borderColorDark};
      min-height: 200px;
      font-size: 22px;
      text-decoration: none;
      color: ${colors.black};
      position: relative;
      width: 80%;
      

      :hover{
        border: 1px solid ${colors.neutral}
      }

      > div{
        width: 100%;
        :hover{
          outline: none;
        }
      }
    }


    .delete-post{
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        font-size: 1.2rem;
        z-ndex: 2;
        :hover{
            transform: scale(1.1)
        }
    }
  }


  @media (max-width: ${breakpoints.mobile}){
    padding: 2rem 0;
    margin-bottom: 2rem;
    .post-card{
      width: 100%;
    }
  }
`;
export default { Container };
