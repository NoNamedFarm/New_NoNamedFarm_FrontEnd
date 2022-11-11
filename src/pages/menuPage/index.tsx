import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Create } from "../../assets/images";
import FarmMenu from "../../components/menu/farm";
import JournalMenu from "../../components/menu/journal";
import { pxToRem } from "../../utils/pxToRem";

function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const contents = searchParams.get("contents");

  return (
    <Wrapper>
      {contents === "farm" && (
        <>
          <span>
            <span>
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
            <span>
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
