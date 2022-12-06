import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { farmLoadList } from "../../../apis/farm/loadList";
import { FarmLoadListResponseType } from "../../../assets/types/farm/loadList/response";
import {
  farmListStateAtom,
  farmListStateAtomType,
} from "../../../atoms/farmListState";
import {
  searchStateAtom,
  searchStateAtomType,
} from "../../../atoms/searchState";
import FarmCard from "../../farmCard";
import LoadButton from "../../loadButton";

const FarmMenu = () => {
  const [farmListState, setFarmListState] =
    useRecoilState<farmListStateAtomType>(farmListStateAtom);
  const [searchState] = useRecoilState<searchStateAtomType>(searchStateAtom);

  const loadMore = async (isFirstRendered?: boolean) => {
    if (isFirstRendered && farmListState.currentPage! > 0) return;

    let temp = Object.assign({}, farmListState);
    let data: FarmLoadListResponseType;

    if (temp.currentPage! < temp.totalPage + 1) {
      data = (await farmLoadList({
        page: temp.currentPage!,
        size: 6,
      })) as FarmLoadListResponseType;

      if (data) {
        data.farmResponses.forEach((v) => {
          if (!temp.farmResponses.some((entry) => entry.id === v.id))
            temp.farmResponses = [...temp.farmResponses, v];
        });
        if (
          farmListState.farmResponses.length > 6 &&
          farmListState.farmResponses === temp.farmResponses &&
          temp.farmResponses.length !== 0
        )
          alert("더 이상 불러올 항목이 존재하지 않습니다.");
        if (data.farmResponses.length === 6) temp.currentPage!++;
        temp.totalPage = data.totalPage;
        setFarmListState(temp);
      }
    }
  };

  useEffect(() => {
    if (farmListState.farmResponses.length === 0) loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FarmWrapper
      isLoadable={
        farmListState.farmResponses.length / 6 < farmListState.totalPage &&
        farmListState.totalPage > 0 &&
        farmListState.currentPage !== farmListState.totalPage
      }
    >
      {farmListState.farmResponses &&
        farmListState.farmResponses.map(
          (v) =>
            v.farmName.includes(searchState.searchQuery) && (
              <FarmCard
                key={v.id}
                farmId={v.id}
                farmName={v.farmName}
                farmCrop={v.farmCrop}
                createdDate={v.createdDate}
                temperature={v.temperature}
                airHumidity={v.airHumidity}
                soilHumidity={v.soilHumidity}
              />
            )
        )}
      {Math.ceil(farmListState.farmResponses.length / 6) <
        farmListState.totalPage &&
        farmListState.totalPage > 0 &&
        farmListState.currentPage !== farmListState.totalPage && (
          <LoadButton loadType="farm" loadMore={loadMore} />
        )}
    </FarmWrapper>
  );
};

export default FarmMenu;

interface FarmWrapperProps {
  isLoadable: boolean;
}

const FarmWrapper = styled.div<FarmWrapperProps>`
  width: calc(100% + 5.75%);
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
