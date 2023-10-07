import styled from "styled-components";
import { colors } from "../../themes/tokens";

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

  .profile-info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 3rem;
    gap: 2rem;
    border-bottom: 1px solid ${colors.borderColor};

    .profile-details {
      display: flex;
      flex: 1;
      width: 100%;
      justify-content: center;
    }

    h2 {
      display: flex;
      width: 100%;
      justify-content: center;
      color: ${colors.neutral};
    }

    h3 {
      text-align: center;
      padding: 0 1rem;
      font-weight: normal;
      line-height: 2rem;
      flex: 1;
      cursor: pointer;
      transition: color 200ms ease;

      :not(:nth-child(1)):hover {
        color: ${colors.borderColorDark};
      }

      span {
        font-weight: bold;
        font-size: 2rem;
      }

      &:nth-child(2) {
        border-left: 1px solid ${colors.borderColor};
        border-right: 1px solid ${colors.borderColor};
      }
    }

    .profile-actions {
      display: flex;
      width: 100%;
      padding: 3rem;
      gap: 2rem;

      button,
      button + a {
        text-decoration: none;
        text-align: center;
        padding: 1rem 2rem;
        width: 100%;
        background-color: ${colors.background};
        cursor: pointer;
        outline: 2px solid ${colors.white};
        border: 2px solid ${colors.borderColorDark};
        color: ${colors.neutral};
        transition: all 0.2s;

        :hover {
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  .avatar {
    font-size: 1.5rem;
    place-items: center;
    outline: 4px solid white;
    border-radius: 50%;
    box-shadow: 0px 0px 0px 7px ${colors.borderColorDark};

    svg {
      height: 6rem;
      width: 6rem;
      padding: 1rem;
      box-sizing: content-box;
      border: 4px solid ${colors.borderColorDark};

      color: ${colors.neutral};
      border-radius: 50%;
    }
  }

  .profile-info + h3 {
    margin: 2rem 0 1rem 0;
    font-size: 1.5rem;
    color: ${colors.neutral};
  }

  .post-list {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    a {
      text-decoration: none;
    }
  }
`;

export default { Container };
