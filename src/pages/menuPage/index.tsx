import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Create } from "../../assets/images";
import { modalStateAtom, modalStateAtomType } from "../../atoms/modalState";
import FarmMenu from "../../components/menu/farm";
import JournalMenu from "../../components/menu/journal";
import FarmCreateModal from "../../components/modal/farmCreate";
import { pxToRem } from "../../utils/pxToRem";

function MenuPage() {
  const [, setModalState] = useRecoilState<modalStateAtomType>(modalStateAtom);

  const now = new Date();
  const dateForm: string = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}`;

  const [searchParams] = useSearchParams();
  const contents = searchParams.get("contents");
  const navigate = useNavigate();

  return (
    <Wrapper>
      {contents === "farm" && (
        <>
          <span>
            <span
              onClick={() => {
                setModalState({
                  title: "농장 생성",
                  modalContents: <FarmCreateModal />,
                });
              }}
            >
              <img src={Create} alt="create farm" />
              농장 생성
            </span>
          </span>
          <FarmMenu />
        </>
      )}
      {contents === "journal" && (
        <>
          <span>
            <span
              onClick={() => {
                navigate(`/journal/${dateForm}?type=write`);
              }}
            >
              <img src={Create} alt="create journal" />
              일지 생성
            </span>
          </span>
          <JournalMenu />
        </>
      )}
    </Wrapper>
  );
}

export default MenuPage;

const Wrapper = styled.div`
  > span {
    margin-bottom: ${pxToRem(25)}rem;

    display: flex;
    justify-content: flex-end;

    > span {
      display: flex;
      align-items: center;

      color: ${({ theme }) => theme.colors.grey1f};
      font-size: ${({ theme }) => theme.fontSizes.subText};

      ${({ theme }) => theme.common.hoverEffect}

      > img {
        margin-right: ${pxToRem(6)}rem;

        width: ${({ theme }) => theme.fontSizes.subText};
        height: ${({ theme }) => theme.fontSizes.subText};
      }
    }
  }
`;
