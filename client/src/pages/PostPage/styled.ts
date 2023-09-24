import styled from "styled-components";
import { colors } from "../../themes/tokens";

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem;
  gap: 2rem;

  .back-button {
    position: fixed;
    left: 3rem;
    text-decoration: none;
    font-size: 1.5rem;
    top: 10rem;
    cursor: pointer;
  }
`;

const CommentsSection = styled.div`
  background: ${colors.white};
  border-radius: 0.5rem;
  border: 1px solid ${colors.borderColorDark};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  font-size: 18px;
  line-height: 1.5rem;
  color: ${colors.black};
  position: relative;

  .no-comments {
    width: 100%;
    text-align: center;
    color: ${colors.neutral};
    margin-top: 1rem;
  }

  .comment {
    padding: 1.5rem;
    margin-right: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .comment__date {
      font-size: 1rem;
      color: ${colors.neutral};
    }

    .comment__user-avatar {
      position: relative;
      margin-right: 0.8rem;

      padding: 1rem;
      font-size: 1.5rem;

      svg {
        position: absolute;

        padding: 0.5rem;
        box-sizing: content-box;
        border: 2px solid ${colors.borderColorDark};
        color: ${colors.neutral};
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      &:has(a):hover svg {
        background: rgba(0, 0, 0, 0.05);
      }
    }

    p {
      color: ${colors.neutral};
      line-height: 1.5rem;
      padding: 0.5rem 0;
    }
  }

  .profile-link {
    text-decoration: none;
    color: ${colors.black};

    :hover {
      text-decoration: underline;
    }
  }

  :has(textarea:active, textarea:focus, button:active, button:focus) {
    outline: none;
  }

  :hover {
    outline: 1px solid ${colors.neutral};
  }

  h3 {
    align-self: flex-start;
    font-size: 2rem;
  }
`;

const commentActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;

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
    cursor: pointer;
  }

  > svg:nth-child(1) {
    color: red;
  }
`;

export default { Container, CommentsSection, commentActionsContainer };
