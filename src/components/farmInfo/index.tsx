import { useEffect, useState } from "react";
import styled from "styled-components";
import { Edit, Refresh } from "../../assets/images";
import { getRemaining } from "../../utils/getRemaining";
import { pxToRem } from "../../utils/pxToRem";
import Gauge from "../gauge";

interface FarmInfoProps {
  temperature: number;
  humidity: number;
  scheduledDate: Date;
}

const FarmInfo = ({ temperature, humidity, scheduledDate }: FarmInfoProps) => {
  const [remainingTime, setRemainingTime] = useState<string>("");

  useEffect(() => {
    const Timer = setInterval(() => {
      setRemainingTime(getRemaining(scheduledDate));
    }, 1000);

    return () => {
      clearInterval(Timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Background>
      <Wrapper>
        <MenuWrapper>
          <span>
            <img src={Edit} alt="edit farm" />
            농장 정보 수정
          </span>
        </MenuWrapper>
        <span>
          <span>
            <img src={Refresh} alt="create farm" />
            새로고침
          </span>
        </span>
      </Wrapper>
      <GaugeWrapper>
        <Gauge
          label="대기 온도 (℃)"
          type="temperature"
          min={-20}
          max={80}
          value={10}
        />
        <Gauge
          label="토양 습도 (%)"
          type="soilHumidity"
          min={0}
          max={100}
          value={10}
        />
        <Gauge
          label="대기 습도 (%)"
          type="airHumidity"
          min={0}
          max={100}
          value={10}
        />
      </GaugeWrapper>
    </Background>
  );
};

const Background = styled.div`
  margin-left: 15%;
  margin-right: 15%;

  width: 70%;
`;

const GaugeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  > span {
    margin-top: ${pxToRem(25)}rem;
    margin-bottom: ${pxToRem(25)}rem;

    display: flex;
    justify-content: flex-end;

    > span {
      display: flex;
      align-items: center;

      color: ${({ theme }) => theme.colors.grey};
      font-size: ${({ theme }) => theme.fontSizes.description};

      ${({ theme }) => theme.common.hoverEffect}

      > img {
        margin-right: ${pxToRem(6)}rem;

        width: ${pxToRem(13.53)}rem;
        height: ${pxToRem(13.53)}rem;
      }
    }
  }
`;

const MenuWrapper = styled.div`
  height: ${pxToRem(48)}rem;

  display: flex;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};

  a {
    background-color: transparent;

    width: ${pxToRem(136)}rem;
    height: ${pxToRem(48)}rem;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: ${({ theme }) => theme.fontSizes.subText};
    text-decoration: none;

    border: none;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    transition: color 0.25s ease, background-color 0.25s ease;
    cursor: pointer;

    :hover {
      background-color: #eee;
    }

    :nth-child(1) {
      color: ${({ theme }) => theme.colors.green};

      border: 1px solid ${({ theme }) => theme.colors.grey};
      border-bottom: 1px solid ${({ theme }) => theme.colors.white};
    }
  }

  > span {
    margin-bottom: ${pxToRem(25)}rem;

    display: flex;
    align-items: center;

    color: ${({ theme }) => theme.colors.grey};
    font-size: ${({ theme }) => theme.fontSizes.description};

    ${({ theme }) => theme.common.hoverEffect}

    > img {
      margin-right: ${pxToRem(6)}rem;

      width: ${pxToRem(13.53)}rem;
      height: ${pxToRem(13.53)}rem;
    }
  }
`;
export default FarmInfo;
