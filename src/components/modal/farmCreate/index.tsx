import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { farmCreate } from "../../../apis/farm/create";
import { farmLoadList } from "../../../apis/farm/loadList";
import { FarmCreateRequestType } from "../../../assets/types/farm/create/request";
import { FarmLoadListResponseType } from "../../../assets/types/farm/loadList/response";
import {
  farmListStateAtom,
  farmListStateAtomType,
} from "../../../atoms/farmListState";
import { modalStateAtom, modalStateAtomType } from "../../../atoms/modalState";
import { pxToRem } from "../../../utils/pxToRem";
import ModalButton from "../button";
import ModalInput from "../input";

const FarmCreateModal = () => {
  const [, setModalState] = useRecoilState<modalStateAtomType>(modalStateAtom);
  const [farmListState, setFarmListState] =
    useRecoilState<farmListStateAtomType>(farmListStateAtom);

  const [farmState, setFarmState] = useState<FarmCreateRequestType>({
    deviceId: "",
    farmName: "",
    farmCrop: "",
  });
  const [warning, setWarning] = useState<FarmCreateRequestType>({
    deviceId: "",
    farmName: "",
    farmCrop: "",
  });

  const loadMore = () => {
    let temp = Object.assign({}, farmListState);
    let data: FarmLoadListResponseType;

    temp.currentPage = 0;

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
  };

  const validateForm = (): boolean => {
    let temp = Object.assign({}, warning);

    if (farmState.deviceId === "") {
      temp = {
        deviceId: "값이 입력되지 않았습니다.",
        farmName: "",
        farmCrop: "",
      };
      setWarning(temp);
      return false;
    } else temp.deviceId = "";

    if (farmState.farmName === "") {
      temp = {
        deviceId: "",
        farmName: "값이 입력되지 않았습니다.",
        farmCrop: "",
      };
      setWarning(temp);
      return false;
    } else temp.farmName = "";

    if (farmState.farmCrop === "") {
      temp = {
        deviceId: "",
        farmName: "",
        farmCrop: "값이 입력되지 않았습니다.",
      };
      setWarning(temp);
      return false;
    } else temp.farmCrop = "";

    if (temp.farmName.length > 5) {
      temp.farmName = "농장 이름 형식이 올바르지 않습니다.";
      setWarning(temp);
      return false;
    } else temp.farmName = "";

    if (temp.farmCrop.length > 15) {
      temp.farmCrop = "기르는 작물 형식이 올바르지 않습니다.";
      setWarning(temp);
      return false;
    } else temp.farmCrop = "";

    setWarning(temp);
    return true;
  };

  const onSubmit = async () => {
    if (validateForm()) {
      const response = await farmCreate(farmState);
      if (response === true) {
        setModalState({ title: "", modalContents: null });
        loadMore();
      } else {
        if (response === 400) {
          let temp = Object.assign({}, warning);
          temp = {
            deviceId: "",
            farmName: "",
            farmCrop: "",
          };
          setWarning(temp);
        }
        if (response === 404) {
          let temp = Object.assign({}, warning);
          temp = {
            deviceId: "농장 아이디가 존재하지 않습니다.",
            farmName: "",
            farmCrop: "",
          };
          setWarning(temp);
        }
        if (response === 409) {
          let temp = Object.assign({}, warning);
          temp = {
            deviceId: "해당 농장의 주인이 존재합니다.",
            farmName: "",
            farmCrop: "",
          };
          setWarning(temp);
        }
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
      <ModalInput
        id="farmId"
        label="농장 아이디"
        warning={warning.deviceId}
        value={farmState.deviceId}
        setValue={(deviceId: string) => {
          let temp = Object.assign({}, farmState);
          temp.deviceId = deviceId;
          setFarmState(temp);
        }}
      />
      <ModalInput
        id="farmName"
        label="농장 이름"
        placeholder="1 ~ 5 글자"
        warning={warning.farmName}
        value={farmState.farmName}
        setValue={(farmName: string) => {
          let temp = Object.assign({}, farmState);
          temp.farmName = farmName;
          setFarmState(temp);
        }}
      />
      <ModalInput
        id="farmCrop"
        label="기르는 작물"
        placeholder="1 ~ 15 글자"
        warning={warning.farmCrop}
        value={farmState.farmCrop}
        setValue={(farmCrop: string) => {
          let temp = Object.assign({}, farmState);
          temp.farmCrop = farmCrop;
          setFarmState(temp);
        }}
      />
      <div>
        <ModalButton
          label="취소"
          onClick={() => {
            setModalState({ title: "", modalContents: null });
          }}
        />
        <ModalButton type="submit" label="생성" />
      </div>
    </Wrapper>
  );
};

export default FarmCreateModal;

const Wrapper = styled.form`
  > div {
    margin-top: ${pxToRem(25)}rem;

    :last-of-type {
      margin-top: ${pxToRem(25)}rem;

      width: 100%;

      display: flex;
      justify-content: space-between;
    }
  }
`;
