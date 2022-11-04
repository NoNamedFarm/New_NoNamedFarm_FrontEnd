import styled from "styled-components";
import Header from "../../../components/header";
import JournalMenu from "../../../components/menu/journal";
import { pxToRem } from "../../../utils/functions/pxToRem";

function JournalMainPage() {
  return (
    <>
      <Header />
      <Wrapper>
        <TitleWrapper>
          <h1>홍길동전</h1>
          <div>
            <div>
              <span>
                보유 농장 <strong>1</strong>
              </span>
              <span>
                농장 일지 <strong>2</strong>
              </span>
            </div>
            <span>
              농장을 가꾼지 <strong>50일</strong> 지났어요.
            </span>
          </div>
        </TitleWrapper>
        <JournalMenu />
      </Wrapper>
    </>
  );
}

export default JournalMainPage;

const Wrapper = styled.div`
  padding-top: ${pxToRem(80)}rem;

  height: auto;
  min-height: calc(100vh - 6rem);
`;

const TitleWrapper = styled.div`
  padding-left: 15%;
  padding-right: 15%;
  margin-top: ${pxToRem(64)}rem;
  margin-bottom: ${pxToRem(64)}rem;

  display: flex;
  align-items: center;

  @media screen and (max-width: 1260px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  > h1 {
    margin-right: ${pxToRem(25)}rem;

    display: inline-flex;

    font-size: ${({ theme }) => theme.fontSize.title};

    ${({ theme }) => theme.common.gb};
  }

  span {
    color: ${({ theme }) => theme.color.grey};
    font-size: ${({ theme }) => theme.fontSize.subText};
  }

  strong {
    color: ${({ theme }) => theme.color.darkGrey};
    font-size: ${({ theme }) => theme.fontSize.subText};
  }

  > div {
    > div {
      display: flex;
      justify-content: space-between;
    }
  }
`;
