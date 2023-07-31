import styled from "styled-components";
import { breakpoints } from "../../themes/tokens";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-block: 2rem;

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 7rem;
  }
`;
export default { Container };
