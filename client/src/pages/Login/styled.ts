import styled from "styled-components";
import { breakpoints } from "../../themes/tokens";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 80vh;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0;
  }
`;
export default { Container };
