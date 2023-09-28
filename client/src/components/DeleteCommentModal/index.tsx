import React from "react";
import Modal from "../Modal";
import { useMainContext } from "../../contexts/MainContext";
import { notifySuccess, notifyError } from "../../utils/toast";
import { useSinglePostContext } from "../../contexts/SinglePostContext";

const DeleteCommentModal: React.FC = () => {
  const { openModal, setOpenModal, handleCommentDelete, selectedComment } =
    useMainContext();
  const { currentPost } = useSinglePostContext();

  const handleConfirm = async () => {
    if (!selectedComment || !currentPost)
      return notifyError(
        "Must be inside a post and select a comment to delete"
      );
    notifySuccess("Comment Deleted");
    await handleCommentDelete(selectedComment._id, currentPost._id);
    setOpenModal(null);
  };
  return (
    <Modal
      onConfirm={handleConfirm}
      onCancel={() => setOpenModal(null)}
      onClose={() => setOpenModal(null)}
      isOpen={openModal === "delete-comment"}
      title="Deleting comment"
    >
      <p>Are you sure that you want to delete this comment? </p>
    </Modal>
  );
};

export default DeleteCommentModal;
