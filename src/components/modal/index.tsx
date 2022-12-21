import { createPortal } from "react-dom";
import styled from "styled-components";
import { pxToRem } from "../../utils/pxToRem";

interface ModalProps {
  title: string;
  modalContents: JSX.Element | JSX.Element[] | null;
}

const Modal = ({ title, modalContents }: ModalProps) => {
  return createPortal(
    <>
      <Filter />
      <Background>
        <Wrapper>
          <h1>{title}</h1>
          {modalContents}
        </Wrapper>
      </Background>
    </>,
    document.getElementById("modal")!
  );
};

export default Modal;

const Filter = styled.div`
  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: ${({ theme }) => theme.colors.translucent};

  width: 200vw;
  height: 200vh;

  filter: blur(0.25rem);
  z-index: 998;
`;

const Background = styled.div`
  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};

  padding: ${pxToRem(48)}rem;

  width: max-content;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 1.5rem;

  > h1 {
    font-size: ${({ theme }) => theme.fontSizes.modalTitle};

    ${({ theme }) => theme.common.gb};
  }
`;
