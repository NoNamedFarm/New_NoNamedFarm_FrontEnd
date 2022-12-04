import { useRecoilState } from "recoil";
import styled from "styled-components";
import { modalStateAtom, modalStateAtomType } from "../../../atoms/modalState";
import { pxToRem } from "../../../utils/pxToRem";
import ModalButton from "../button";

interface JournalDeleteModalProps {
  journalId: number;
}

const JournalDeleteModal = ({ journalId }: JournalDeleteModalProps) => {
  const [, setModalState] = useRecoilState<modalStateAtomType>(modalStateAtom);

  return (
    <Wrapper
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      }}
    >
      <h2>일지를 삭제하시겠습니까?</h2>
      <div>
        <ModalButton
          label="취소"
          onClick={() => {
            setModalState({ title: "", modalContents: null });
          }}
        />
        <ModalButton
          label="삭제"
          onClick={() => {
            setModalState({ title: "", modalContents: null });
          }}
        />
      </div>
    </Wrapper>
  );
};

export default JournalDeleteModal;

const Wrapper = styled.form`
  > h2 {
    font-size: ${({ theme }) => theme.fontSizes.text};
    text-align: center;
  }

  > div {
    margin-top: ${pxToRem(30)}rem;

    :last-of-type {
      margin-top: ${pxToRem(40)}rem;
      width: ${pxToRem(548)}rem;

      display: flex;
      justify-content: space-between;
    }
  }
`;
