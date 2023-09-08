import React from "react";
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

const Modal = () => {
  return (
    <StyledModal>
      <StyledBackDrop />
      <StyledModalContainer>
        <StyledModalHeader>
          <div className="title">Some title</div>
          <div className="icon">
            <AiOutlineClose />
          </div>
        </StyledModalHeader>
        <StyledModalContent>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora
            maiores ex facilis repellat dolor doloribus nulla unde saepe! Minus
            voluptate vitae harum quia voluptatem ab accusantium dolores
            distinctio consequatur eaque?
          </p>
        </StyledModalContent>
        <StyledModalFooter>
          <span>Annulla</span>
          <Button />
        </StyledModalFooter>
      </StyledModalContainer>
    </StyledModal>
  );
};

export default Modal;
