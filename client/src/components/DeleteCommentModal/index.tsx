import React, { useContext } from "react";
import Modal from "../Modal";
import { IMainContext, IPostContext } from "../../contexts/types";
import { MainContext } from "../../contexts/MainContext";
import { notifySuccess, notifyError } from "../../utils/toast";
import { toast } from "react-toastify";
import { PostContext } from "../../contexts/PostContext";

const DeleteCommentModal: React.FC = () => {
  const { openModal, setOpenModal, handleCommentDelete, selectedComment } =
    useContext<IMainContext>(MainContext);
  const { currentPost } = useContext<IPostContext>(PostContext);

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
