import React, { useContext } from "react";
import Modal from "../Modal";
import { IMainContext } from "../../contexts/types";
import { MainContext } from "../../contexts/MainContext";
import { notifySuccess, notifyError } from "../../utils/toast";
import { toast } from "react-toastify";

const DeletePostModal: React.FC = () => {
  const { openModal, setOpenModal, handlePostDelete, selectedPost } =
    useContext<IMainContext>(MainContext);

  const handleConfirm = async () => {
    if (!selectedPost) return notifyError("No post selected");
    notifySuccess("Post Deleted");
    await handlePostDelete(selectedPost._id);
    setOpenModal(null);
  };
  return (
    <Modal
      onConfirm={handleConfirm}
      onCancel={() => setOpenModal(null)}
      onClose={() => setOpenModal(null)}
      isOpen={openModal === "delete-post"}
      title={`Delete post "${selectedPost?.title}" `}
    >
      <p>Do you want to delete your post? This action is irreversible.</p>
    </Modal>
  );
};

export default DeletePostModal;
