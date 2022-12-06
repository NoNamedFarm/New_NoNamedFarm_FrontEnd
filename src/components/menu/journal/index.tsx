import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { diaryLoadList } from "../../../apis/diary/loadList";
import { DiaryLoadListResponseType } from "../../../assets/types/diary/loadList/response";
import {
  diaryListStateAtom,
  diaryListStateAtomType,
} from "../../../atoms/diaryListState";
import {
  searchStateAtom,
  searchStateAtomType,
} from "../../../atoms/searchState";
import JournalCard from "../../journalCard";
import LoadButton from "../../loadButton";

const JournalMenu = () => {
  const [diaryListState, setDiaryListState] =
    useRecoilState<diaryListStateAtomType>(diaryListStateAtom);
  const [searchState] = useRecoilState<searchStateAtomType>(searchStateAtom);

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
          diaryListState.diaryResponses.length > 6 &&
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
    <JournalWrapper
      isLoadable={
        diaryListState.diaryResponses.length / 6 < diaryListState.totalPage &&
        diaryListState.totalPage > 0 &&
        diaryListState.currentPage !== diaryListState.totalPage
      }
    >
      {diaryListState.diaryResponses &&
        diaryListState.diaryResponses.map(
          (v) =>
            v.date.includes(searchState.searchQuery) && (
              <JournalCard key={v.id} journalId={v.id} date={v.date} />
            )
        )}
      {Math.ceil(diaryListState.diaryResponses.length / 6) <
        diaryListState.totalPage &&
        diaryListState.totalPage > 0 &&
        diaryListState.currentPage !== diaryListState.totalPage && (
          <LoadButton loadType="journal" loadMore={() => loadMore(false)} />
        )}
    </JournalWrapper>
  );
};

export default JournalMenu;

interface JournalWrapperProps {
  isLoadable: boolean;
}

const JournalWrapper = styled.div<JournalWrapperProps>`
  width: 100%;
  height: max-content;

  display: flex;
  flex-wrap: wrap;

  ${(props) =>
    props.isLoadable
      ? `> button {
    :last-of-type {
      margin-bottom: 0;
    }}`
      : `> a {
    :last-of-type {
      margin-bottom: 0;
    }}`}
`;
