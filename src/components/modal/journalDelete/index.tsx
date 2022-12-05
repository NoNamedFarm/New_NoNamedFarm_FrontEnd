import { useRecoilState } from "recoil";
import styled from "styled-components";
import { diaryDelete } from "../../../apis/diary/delete";
import { diaryLoadList } from "../../../apis/diary/loadList";
import { DiaryLoadListResponseType } from "../../../assets/types/diary/loadList/response";
import {
  diaryListStateAtom,
  diaryListStateAtomType,
} from "../../../atoms/diaryListState";
import { modalStateAtom, modalStateAtomType } from "../../../atoms/modalState";
import { pxToRem } from "../../../utils/pxToRem";
import ModalButton from "../button";

interface JournalDeleteModalProps {
  journalId: number;
}

const JournalDeleteModal = ({ journalId }: JournalDeleteModalProps) => {
  const [, setModalState] = useRecoilState<modalStateAtomType>(modalStateAtom);
  const [diaryListState, setDiaryListState] =
    useRecoilState<diaryListStateAtomType>(diaryListStateAtom);

  const refreshList = async () => {
    let temp = Object.assign({}, diaryListState);
    temp.currentPage = 0;
    temp.diaryResponses = [];

    let data: DiaryLoadListResponseType;

    if (temp.currentPage! < temp.totalPage + 1) {
      data = (await diaryLoadList({
        page: temp.currentPage!,
        size: 6,
      })) as DiaryLoadListResponseType;

      if (data) {
        data.diaryResponses.forEach((v) => {
          if (!temp.diaryResponses.some((entry) => entry.id === v.id))
            temp.diaryResponses = [...temp.diaryResponses, v];
        });
        if (
          diaryListState.diaryResponses === temp.diaryResponses &&
          temp.diaryResponses.length !== 0
        )
          alert("더 이상 불러올 항목이 존재하지 않습니다.");
        if (data.diaryResponses.length === 6) temp.currentPage!++;
        temp.totalPage = data.totalPage;
        setDiaryListState(temp);
      }
    }
  };

  const onSubmit = async () => {
    const response = await diaryDelete({ id: journalId });
    if (response === true) {
      setModalState({ title: "", modalContents: null });
      refreshList();
    } else {
      if (response === 403) {
        alert("권한이 없습니다.");
      }
    }
  };

  return (
    <Wrapper
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
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
        <ModalButton type="submit" label="삭제" />
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
