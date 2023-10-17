import React from "react";
import { ReactNode } from "react";
import { ModalContent } from "@/components/atoms/Modal/Modal.styles"; // 이 부분을 수정

interface ModalProps {
  toggleModal: () => void;
  children?: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return (
    <>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </>
  );
};

export default Modal;
