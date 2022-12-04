import { useEffect } from "react";
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

  const loadMore = () => {
    let temp = Object.assign({}, diaryListState);
    let data: DiaryLoadListResponseType;

    if (temp.currentPage! < temp.totalPage + 1) {
      const fetchData = async () => {
        data = (await diaryLoadList({
          page: temp.currentPage!,
          size: 6,
        })) as DiaryLoadListResponseType;

        if (data) {
          temp.diaryResponses = data.diaryResponses;
          temp.totalPage = data.totalPage;
          setDiaryListState(temp);
        }
      };
      fetchData();
    }
  };

  const onSubmit = async () => {
    const response = await diaryDelete({ id: journalId });
    if (response === true) {
      setModalState({ title: "", modalContents: null });
      loadMore();
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
