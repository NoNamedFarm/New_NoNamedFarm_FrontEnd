import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ArrowUp, Create } from "../../assets/images";
import { modalStateAtom, modalStateAtomType } from "../../atoms/modalState";
import FarmMenu from "../../components/menu/farm";
import JournalMenu from "../../components/menu/journal";
import FarmCreateModal from "../../components/modal/farmCreate";
import SearchInput from "../../components/searchInput";
import { pxToRem } from "../../utils/pxToRem";

function MenuPage() {
  const [, setModalState] = useRecoilState<modalStateAtomType>(modalStateAtom);

  const [hideToTheTopState, setHideToTheTopState] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const contents = searchParams.get("contents");
  const navigate = useNavigate();

  useEffect(() => {
    const toggleToTheTop = () => {
      const nextScrollTop = window.pageYOffset || 0;
      if (nextScrollTop > 0) {
        setHideToTheTopState(true);
      } else {
        setHideToTheTopState(false);
      }
    };
    document.addEventListener("scroll", toggleToTheTop);
    return () => document.removeEventListener("scroll", toggleToTheTop);
  }, []);

  return (
    <Wrapper>
      {contents === "farm" && (
        <>
          <span>
            <SearchInput searchType="farm" placeholder="농장 검색" />
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
            <SearchInput searchType="journal" placeholder="일지 검색" />
            <span
              onClick={() => {
                navigate(`/journal/write`);
              }}
            >
              <img src={Create} alt="create journal" />
              일지 생성
            </span>
          </span>
          <JournalMenu />
        </>
      )}
      <ToTheTop
        hideToTheTopState={hideToTheTopState}
        onClick={() => {
          window.scroll({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <img src={ArrowUp} alt="to the top" />
        <span>맨 위로</span>
      </ToTheTop>
    </Wrapper>
  );
}

export default MenuPage;

interface ToTheTopProps {
  hideToTheTopState: boolean;
}

const ToTheTop = styled.button<ToTheTopProps>`
  position: fixed;
  ${(props) =>
    props.hideToTheTopState ? `bottom: 5vh;` : `bottom: -${pxToRem(120)}rem;`}
  right: 5vw;

  background-color: transparent;

  width: ${pxToRem(60)}rem;
  height: ${pxToRem(60)}rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 50%;

  ${({ theme }) => theme.common.boxShadow}
  ${({ theme }) => theme.common.hoverEffect}
  
  transition: bottom 0.25s ease, filter 0.25s ease;

  > img {
    margin-bottom: ${pxToRem(6)}rem;

    width: ${pxToRem(25)}rem;
  }

  > span {
    color: ${({ theme }) => theme.colors.grey1f};
  }
`;

const Wrapper = styled.div`
  > span {
    margin-bottom: ${pxToRem(25)}rem;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    > span {
      width: max-content;

      display: flex;
      align-items: center;

      color: ${({ theme }) => theme.colors.grey1f};
      font-size: ${({ theme }) => theme.fontSizes.subText};
      white-space: nowrap;

      ${({ theme }) => theme.common.hoverEffect}

      > img {
        margin-right: ${pxToRem(6)}rem;

        width: ${({ theme }) => theme.fontSizes.subText};
        height: ${({ theme }) => theme.fontSizes.subText};
      }
    }
  }
`;
