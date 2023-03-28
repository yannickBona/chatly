import styled from "styled-components";
import { colors } from "../../themes/tokens";

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;


  .post-card {
      background: ${colors.white};
      border-radius: 0.5rem;
      border: 1px solid ${colors.borderColorDark};
      padding: 2rem;
      min-height: 200px;
      font-size: 22px;
      text-decoration: none;
      color: ${colors.black};
      position: relative;

      :hover{
        outline: 1px solid ${colors.neutral}
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
`;
export default { Container };
