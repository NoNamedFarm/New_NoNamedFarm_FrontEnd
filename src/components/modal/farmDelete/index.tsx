import { useRecoilState } from "recoil";
import styled from "styled-components";
import { farmDelete } from "../../../apis/farm/delete";
import { farmLoadList } from "../../../apis/farm/loadList";
import { FarmLoadListResponseType } from "../../../assets/types/farm/loadList/response";
import {
  farmListStateAtom,
  farmListStateAtomType,
} from "../../../atoms/farmListState";
import { modalStateAtom, modalStateAtomType } from "../../../atoms/modalState";
import { pxToRem } from "../../../utils/pxToRem";
import ModalButton from "../button";

interface FarmDeleteModalProps {
  farmId: number;
}

const FarmDeleteModal = ({ farmId }: FarmDeleteModalProps) => {
  const [, setModalState] = useRecoilState<modalStateAtomType>(modalStateAtom);
  const [farmListState, setFarmListState] =
    useRecoilState<farmListStateAtomType>(farmListStateAtom);

  const refreshList = async () => {
    let temp = Object.assign({}, farmListState);
    temp.currentPage = 0;
    temp.farmResponses = [];
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

  const onSubmit = async () => {
    const response = await farmDelete({ farmId });
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
      <h2>농장을 삭제하시겠습니까?</h2>
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

export default FarmDeleteModal;

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
