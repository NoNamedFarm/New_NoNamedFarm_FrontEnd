import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { diaryLoadList } from "../../../apis/diary/loadList";
import { DiaryLoadListResponseType } from "../../../assets/types/diary/loadList/response";
import {
  diaryListStateAtom,
  diaryListStateAtomType,
} from "../../../atoms/diaryListState";
import { pxToRem } from "../../../utils/pxToRem";
import JournalCard from "../../journalCard";
import LoadButton from "../../loadButton";

const JournalMenu = () => {
  const [diaryListState, setDiaryListState] =
    useRecoilState<diaryListStateAtomType>(diaryListStateAtom);

  const loadMore = async (isFirstRendered?: boolean) => {
    if (isFirstRendered && diaryListState.currentPage! > 0) return;

    let temp = Object.assign({}, diaryListState);
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

  useEffect(() => {
    loadMore(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <JournalWrapper>
      {diaryListState.diaryResponses &&
        diaryListState.diaryResponses.map((v) => (
          <JournalCard key={v.id} journalId={v.id} date={v.date} />
        ))}
      {diaryListState.totalPage > 0 &&
        diaryListState.currentPage !== diaryListState.totalPage && (
          <LoadButton loadType="journal" loadMore={() => loadMore(false)} />
        )}
    </JournalWrapper>
  );
};

export default JournalMenu;

const JournalWrapper = styled.div`
  margin-bottom: ${pxToRem(25)}rem;

  width: 100%;
  height: ${pxToRem(48)}rem;

  display: flex;
  flex-wrap: wrap;

  > div {
    margin-bottom: ${pxToRem(25)}rem;

    :last-of-type {
      margin-bottom: 0;
    }
  }
`;
