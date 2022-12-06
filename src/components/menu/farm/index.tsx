import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { farmLoadList } from "../../../apis/farm/loadList";
import { FarmLoadListResponseType } from "../../../assets/types/farm/loadList/response";
import {
  farmListStateAtom,
  farmListStateAtomType,
} from "../../../atoms/farmListState";
import { pxToRem } from "../../../utils/pxToRem";
import FarmCard from "../../farmCard";
import LoadButton from "../../loadButton";

const FarmMenu = () => {
  const [farmListState, setFarmListState] =
    useRecoilState<farmListStateAtomType>(farmListStateAtom);

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
    <FarmWrapper>
      {farmListState.farmResponses &&
        farmListState.farmResponses.map((v) => (
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
        ))}
      {farmListState.farmResponses.length >= 6 &&
        farmListState.totalPage > 0 &&
        farmListState.currentPage !== farmListState.totalPage && (
          <LoadButton loadType="farm" loadMore={loadMore} />
        )}
    </FarmWrapper>
  );
};

export default FarmMenu;

const FarmWrapper = styled.div`
  margin-bottom: ${pxToRem(25)}rem;

  width: calc(100% + 5.75%);

  display: flex;
  flex-wrap: wrap;

  > div {
    margin-right: 5%;

    :last-of-type {
      margin-right: 0;
    }
  }
`;
