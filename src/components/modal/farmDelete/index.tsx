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

  const onSubmit = async () => {
    const response = await farmDelete({ farmId });
    if (response === true) {
      setModalState({ title: "", modalContents: null });
      loadMore();
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
