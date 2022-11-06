import styled from "styled-components";
import FarmInfo from "../../components/farmInfo";
import Header from "../../components/header";
import { humidity, scheduledDate, temperature } from "../../utils/farmInfo";
import { pxToRem } from "../../utils/pxToRem";

function FarmPage() {
  const date = "22-10-18";
  const crop = "상추";

  return (
    <>
      <Header />
      <Wrapper>
        <TitleWrapper>
          <h1>홍길동전</h1>
          <div>
            <span>{date}</span>
            <span>작물 : {crop}</span>
          </div>
        </TitleWrapper>
        <FarmInfo
          temperature={Math.round(temperature)}
          humidity={Math.round(humidity)}
          scheduledDate={scheduledDate}
        />
      </Wrapper>
    </>
  );
}

export default FarmPage;

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

    font-size: ${({ theme }) => theme.fontSizes.title};

    ${({ theme }) => theme.common.gb};
  }

  span {
    color: ${({ theme }) => theme.colors.grey};
    font-size: ${({ theme }) => theme.fontSizes.subText};
  }

  strong {
    color: ${({ theme }) => theme.colors.darkGrey};
    font-size: ${({ theme }) => theme.fontSizes.subText};
  }

  > div {
    display: flex;
    flex-direction: column;
  }
`;
