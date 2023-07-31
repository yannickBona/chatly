import styled from "styled-components";
import { breakpoints, colors } from "../../themes/tokens";

const Container = styled.div`
  background: ${colors.background};
  border-radius: 0.5rem;
  border: 2px solid ${colors.borderColorDark};
  padding: 1.5rem;
  min-height: 200px;
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

  p {
    color: ${colors.neutral};
  }

  .container {
    margin: 1.5rem 0;

    .profiles-list {
      display: flex;
      gap: 1rem;
    }

    .posts-list {
      display: flex;
      gap: 1rem;
      flex-direction: column;
    }

    &.posts a {
      text-decoration: none;
    }

    h3 {
      padding: 1rem 0;
    }
  }

  .header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;

    .title,
    > div:has(input[type="search"]) {
      flex: 1;
    }
    .title h1 {
      margin-bottom: 1rem;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    margin: 7rem 0;

    // padding: 2rem 1rem;
    padding: 2rem 0;

    .header {
      flex-direction: column;
      align-items: flex-start;
      padding-inline: 1rem;
    }

    .container {
      h3 {
        padding: 0 0 1rem 1rem;
      }

      .profiles-list {
        overflow-x: scroll;
        padding: 1rem;

        -ms-overflow-style: none;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
        }
      }

      .posts-list {
        padding: 1rem;
      }
    }
  }
`;
export default { Container };
