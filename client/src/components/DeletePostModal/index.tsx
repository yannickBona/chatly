import React, { useContext } from "react";
import Modal, { ModalProps } from "../Modal";
import { IMainContext } from "../../contexts/types";
import { MainContext } from "../../contexts/MainContext";

const DeletePostModal: React.FC = () => {
  const { openModal, setOpenModal } = useContext<IMainContext>(MainContext);

  const handleConfirm = () => {
    setOpenModal(null);
  };
  return (
    <Modal
      onConfirm={handleConfirm}
      onCancel={() => setOpenModal(null)}
      onClose={() => setOpenModal(null)}
      isOpen={openModal === "delete-post"}
      title="Post delete"
    >
      <p>Do you want to delete your post? This action is irreversible.</p>
    </Modal>
  );
};

export default DeletePostModal;
