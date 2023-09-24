import styled from "styled-components";
import { colors } from "../../themes/tokens";

const Container = styled.div`
  background: ${colors.white};
  border-radius: 0.5rem;
  border: 1px solid ${colors.borderColorDark};
  padding: 1.5rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  font-size: 18px;
  line-height: 1.5rem;
  text-decoration: none;
  color: ${colors.black};
  position: relative;

  .owner {
    i {
      font-size: 1.1rem;
    }
    .post-date {
      font-size: 1rem;
      color: ${colors.neutral};
    }
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .comment__user-avatar {
    position: relative;

    padding: 1rem;
    font-size: 1.5rem;
    height: 20px;
    width: 20px;
    border-radius: 50%;

    svg {
      position: absolute;
      height: 20px;
      width: 20px;

      padding: 0.5rem;
      box-sizing: content-box;
      border: 2px solid ${colors.borderColorDark};
      color: ${colors.neutral};
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:has(a):hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  svg {
    cursor: pointer;
  }

  p {
    color: ${colors.neutral};
  }

  :hover {
    outline: 1px solid ${colors.neutral};
  }

  .profile-link {
    text-decoration: none;
    color: ${colors.black};

    :hover {
      text-decoration: underline;
    }
  }

  .profile-link:has(i):hover {
    color: red;
  }
`;

const PostActionsContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 1rem;

  .comments,
  .likes {
    display: flex;
    gap: 0.3rem;
    align-items: center;
    user-select: none;
    .filled {
      color: red;
    }
  }

  svg:hover {
    transform: scale(1.2);
  }

  > svg:nth-child(1) {
    color: red;
  }
`;

export default { Container, PostActionsContainer };
