import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem;

  .back-button {
    position: absolute;
    left: 3rem;
    text-decoration: none;
    font-size: 1.5rem;
    top: 3rem;
  }
`;
export default { Container };
