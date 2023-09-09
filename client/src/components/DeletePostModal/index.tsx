import React, { useContext } from "react";
import Modal from "../Modal";
import { IMainContext, IPostContext } from "../../contexts/types";
import { MainContext } from "../../contexts/MainContext";
import { notifySuccess, notifyError } from "../../utils/toast";
import { toast } from "react-toastify";
import { SinglePostContext } from "../../contexts/SinglePostContext";
import { useNavigate } from "react-router-dom";

const DeletePostModal: React.FC = () => {
  const { openModal, setOpenModal, handlePostDelete, selectedPost } =
    useContext<IMainContext>(MainContext);

  const { currentPost } = useContext<IPostContext>(SinglePostContext);

  const navigate = useNavigate();

  const handleConfirm = async () => {
    if (!selectedPost) return notifyError("No post selected");
    notifySuccess("Post Deleted");
    await handlePostDelete(selectedPost._id);

    setOpenModal(null);
    if (currentPost) navigate("/");
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
