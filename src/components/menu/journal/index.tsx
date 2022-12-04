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

const JournalMenu = () => {
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

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <JournalWrapper>
      {diaryListState.diaryResponses &&
        diaryListState.diaryResponses.map((v) => (
          <JournalCard key={v.id} journalId={v.id} date={v.date} />
        ))}
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
