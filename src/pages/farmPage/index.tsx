import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Edit, Refresh } from "../../assets/images";
import DateInfo from "../../components/dateInfo";
import FarmInfo from "../../components/farmInfo";
import Switch from "../../components/switch";
import { baskedDate } from "../../utils/baskedDate";
import { airHumidity, soilHumidity, temperature } from "../../utils/farmInfo";
import { pxToRem } from "../../utils/pxToRem";
import { wateredDate } from "../../utils/wateredDate";

function FarmPage() {
  const params = useParams();

  return (
    <>
      <Title>
        <span>
          <img src={Edit} alt="edit farm" />
          농장 정보 수정
        </span>
        <span>
          <img src={Refresh} alt="create farm" />
          새로고침
        </span>
      </Title>
      <InfoWrapper>
        <div>
          <DateInfo baskedDate={baskedDate} wateredDate={wateredDate} />
        </div>
        <div>
          <span>
            <Switch id="water" label="물 주기" />
            <Switch id="light" label="빛 주기" />
          </span>
          <span>
            물을 안 준 지 <strong>{50}</strong> 일이 지났습니다.
          </span>
          <FarmInfo
            temperature={Math.round(temperature)}
            soilHumidity={Math.round(soilHumidity)}
            airHumidity={Math.round(airHumidity)}
          />
        </div>
      </InfoWrapper>
    </>
  );
}

export default FarmPage;

const Title = styled.div`
  margin-bottom: ${pxToRem(25)}rem;

  width: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  span {
    margin-left: ${pxToRem(36)}rem;

    color: ${({ theme }) => theme.colors.grey1f};
    font-size: ${({ theme }) => theme.fontSizes.subText};

    ${({ theme }) => theme.common.hoverEffect};

    > img {
      margin-right: ${pxToRem(6)}rem;
    }
  }
`;

const InfoWrapper = styled.div`
  @media screen and (min-width: 1620px) {
    display: flex;

    > div {
      width: 50%;

      display: flex;
      flex-direction: column;

      :first-of-type {
        margin-right: ${pxToRem(25)}rem;
      }
    }
  }

  width: 100%;

  > div {
    :first-of-type {
      margin-bottom: ${pxToRem(25)}rem;
    }
  }

  > div {
    > span {
      margin-bottom: ${pxToRem(25)}rem;

      display: flex;
      align-items: center;

      color: ${({ theme }) => theme.colors.grey1f};
      font-size: ${({ theme }) => theme.fontSizes.subText};
      word-break: keep-all;

      strong {
        transform: translateY(0.1rem);

        margin-left: ${pxToRem(4)}rem;
        margin-right: ${pxToRem(4)}rem;

        color: ${({ theme }) => theme.colors.green};
      }
    }
  }
`;
