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

const FarmMenu = () => {
  const [farmListState, setFarmListState] =
    useRecoilState<farmListStateAtomType>(farmListStateAtom);

  const loadMore = () => {
    let temp = Object.assign({}, farmListState);
    let data: FarmLoadListResponseType;

    if (temp.currentPage! < temp.totalPage + 1) {
      const fetchData = async () => {
        data = (await farmLoadList({
          page: temp.currentPage!,
          size: 6,
        })) as FarmLoadListResponseType;

        if (data) {
          temp.farmResponses = data.farmResponses;
          temp.totalPage = data.totalPage;
          setFarmListState(temp);
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
