import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { farmUpdate } from "../../../apis/farm/update";
import { FarmUpdateRequestType } from "../../../assets/types/farm/update/request";
import { farmStateAtom, farmStateAtomType } from "../../../atoms/farmState";
import { modalStateAtom, modalStateAtomType } from "../../../atoms/modalState";
import { pxToRem } from "../../../utils/pxToRem";
import ModalButton from "../button";
import ModalInput from "../input";

const FarmUpdateModal = () => {
  const [, setModalState] = useRecoilState<modalStateAtomType>(modalStateAtom);
  const [farmState] = useRecoilState<farmStateAtomType>(farmStateAtom);

  const [inputState, setInputState] = useState<FarmUpdateRequestType>({
    farmId: farmState.id,
    farmName: "",
    farmCrop: "",
  });
  const [warning, setWarning] = useState<FarmUpdateRequestType>({
    farmName: "",
    farmCrop: "",
  });

  const validateForm = (): boolean => {
    let temp = Object.assign({}, warning);

    if (inputState.farmName === "") {
      temp = {
        farmName: "값이 입력되지 않았습니다.",
        farmCrop: "",
      };
      setWarning(temp);
      return false;
    } else temp.farmName = "";

    if (inputState.farmCrop === "") {
      temp = {
        farmName: "",
        farmCrop: "값이 입력되지 않았습니다.",
      };
      setWarning(temp);
      return false;
    } else temp.farmCrop = "";

    if (inputState.farmName.length > 5) {
      temp.farmName = "농장 이름 형식이 올바르지 않습니다.";
      setWarning(temp);
      return false;
    } else temp.farmName = "";

    if (inputState.farmCrop.length > 15) {
      temp.farmCrop = "기르는 작물 형식이 올바르지 않습니다.";
      setWarning(temp);
      return false;
    } else temp.farmCrop = "";

    setWarning(temp);
    return true;
  };

  const onSubmit = async () => {
    if (validateForm()) {
      const response = await farmUpdate(inputState);
      if (response === true) window.location.reload();
      else if (response === 403) {
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
      <ModalInput
        id="farmName"
        label="농장 이름"
        placeholder="1 ~ 5 글자"
        warning={warning.farmName}
        value={inputState.farmName}
        setValue={(farmName: string) => {
          let temp = Object.assign({}, inputState);
          temp.farmName = farmName;
          setInputState(temp);
        }}
      />
      <ModalInput
        id="farmCrop"
        label="기르는 작물"
        placeholder="1 ~ 15 글자"
        warning={warning.farmCrop}
        value={inputState.farmCrop}
        setValue={(farmCrop: string) => {
          let temp = Object.assign({}, inputState);
          temp.farmCrop = farmCrop;
          setInputState(temp);
        }}
      />
      <div>
        <ModalButton
          label="취소"
          onClick={() => {
            setModalState({ title: "", modalContents: null });
          }}
        />
        <ModalButton type="submit" label="수정" />
      </div>
    </Wrapper>
  );
};

export default FarmUpdateModal;

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
