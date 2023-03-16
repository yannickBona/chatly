import styled from "styled-components";

const Container = styled.form`
  width: 50%;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
  background: #fff;
  border-radius: 0.5rem;
  border: 1px solid #c9c9c9;

  h2 {
    align-self: flex-start;
  }

  input[type="text"],
  textarea {
    border: 1px solid #c9c9c9;
    background-color: #f7f7f9;
    padding: 1rem;
    font-family: inherit;
    width: 100%;
    border-radius: 0.5rem;
    align-self: center;
  }

  textarea {
    height: 150px;
    resize: none;
  }

  button {
    align-self: flex-end;
    padding: 1rem 2rem;
    border: 1px solid #f7f7f9;
    background-color: #c9c9c9;
    border-radius: 0.5rem;
    cursor: pointer;
    font-family: inherit;
    transition: background-color 200ms ease-in-out;

    :hover {
      background-color: #b9b9b9;
    }

    :active {
      transform: scale(0.95);
    }
  }
`;

export default { Container };
