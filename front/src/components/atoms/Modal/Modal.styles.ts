import styled from "styled-components";

export const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 28px;
`;

export const ModalContent = styled.div`
  width: 100%;
  padding: 40px 20px 30px 20px;
  background-color: white;
  border-radius: 30px;
`;
