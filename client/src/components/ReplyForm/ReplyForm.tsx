import { Dispatch, useEffect, useRef, useState } from "react";
import { $ResponseData, IComment, IPost } from "../../types";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { useSinglePostContext } from "../../contexts/SinglePostContext";
import { formatDate } from "../../utils/dateFormat";
import { useUser } from "../../utils/hooks/useUser";
import { EditForm } from "../EditForm/styled";
import Button from "../Button";
import { useMainContext } from "../../contexts/MainContext";
import { createComment } from "../../services/api/Comments/createComment";
import { useAsyncFn } from "../../utils/hooks/useAsync";

const ReplyForm = ({
  comment,
  setCommentReply,
}: {
  comment: IComment;
  setCommentReply: Dispatch<React.SetStateAction<IComment | null>>;
}) => {
  const { currentPost, setCurrentPost } = useSinglePostContext();
  const [content, setContent] = useState(`@${comment.owner} `);
  const { user, setUser } = useUser();
  const { execute: createCommentFn } = useAsyncFn(createComment);
  const { id: postId } = useParams();
  const { postList, setPosts } = useMainContext();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // This sets the height of the textarea to the content if it is greater than min-height
  useEffect(() => {
    if (!textareaRef.current) return;
    const { current: textArea } = textareaRef;
    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`;
    textArea.focus();
    textArea.value = content; // this makes the cursor go to the end of the line
  }, [content]);

  /**
   * Creates a new comment for a specific post
   * @param e form event
   */
  const handleCommentCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentPost) return;

    const response: $ResponseData = await createCommentFn(content, postId);
    if (response.status !== 200) return;

    const newComment = response.data.comment;
    const updatedPosts = [...postList!];

    const postIdx = updatedPosts.findIndex(
      (post) => post._id === currentPost?._id
    );

    const newComments = [...(currentPost?.comments ?? []), newComment];
    const newPost: IPost = {
      ...currentPost,
      comments: newComments,
    };

    updatedPosts[postIdx] = newPost;
    setCurrentPost(newPost);
    setPosts(updatedPosts);
    setCommentReply(null);
  };

  return (
    <div className="comment" key={comment._id}>
      <div>
        <span className="comment__user-avatar">
          <AiOutlineUser />
        </span>
        <b>
          <Link className="profile-link" to={`/profile/${user?.username}`}>
            {user?.username} (you)
          </Link>
        </b>
        {user?.username === currentPost?.owner && " (Post Owner)"}
        <span className="comment__date"> {formatDate(String(new Date()))}</span>
      </div>

      <EditForm
        style={{ margin: "1rem 0" }}
        onSubmit={handleCommentCreate}
        isComment
      >
        <textarea
          placeholder={comment ? "" : "Text (optional)"}
          ref={textareaRef}
          onChange={(e) => setContent(e.currentTarget.value)}
        />

        <div
          className="button-container"
          style={{
            justifyContent: "flex-end",
            flexDirection: "row-reverse",
            margin: "1rem 0",
          }}
        >
          <button onClick={() => setCommentReply(null)}>Cancel</button>
          <Button text="Reply" disabled={!content} />
        </div>
      </EditForm>
    </div>
  );
};

export default ReplyForm;
