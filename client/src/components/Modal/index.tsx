import React, { Children, useEffect } from "react";
import {
  StyledModal,
  StyledBackDrop,
  StyledModalHeader,
  StyledModalContent,
  StyledModalFooter,
  StyledModalContainer,
} from "./styled";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button";

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  onCancel,
  onClose,
  onConfirm,
  title,
  confirmText = "Confirm",
  isOpen,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, []);

  return isOpen ? (
    <StyledModal>
      <StyledBackDrop />
      <StyledModalContainer>
        <StyledModalHeader>
          <div className="title">{title}</div>
          <AiOutlineClose onClick={onClose} />
        </StyledModalHeader>
        <StyledModalContent>{children}</StyledModalContent>
        <StyledModalFooter>
          <span onClick={onCancel}>Cancel</span>
          <Button onClick={onConfirm} text={confirmText} />
        </StyledModalFooter>
      </StyledModalContainer>
    </StyledModal>
  ) : null;
};

export default Modal;
