import moment from "moment";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { farmLoadAll } from "../../apis/farm/loadAll";
import { Edit, Refresh } from "../../assets/images";
import { farmStateAtom, farmStateAtomType } from "../../atoms/farmState";
import { modalStateAtom, modalStateAtomType } from "../../atoms/modalState";
import DateInfo from "../../components/dateInfo";
import FarmInfo from "../../components/farmInfo";
import FarmUpdateModal from "../../components/modal/farmUpdate";
import Switch from "../../components/switch";
import { pxToRem } from "../../utils/pxToRem";

function FarmPage() {
  const [, setModalState] = useRecoilState<modalStateAtomType>(modalStateAtom);
  const [farmState, setFarmState] =
    useRecoilState<farmStateAtomType>(farmStateAtom);

  const params = useParams();

  const fetchData = async () => {
    if (params.id) {
      let now: Date;
      now = moment(
        document.getElementsByClassName(
          "react-calendar__navigation__label__labelText"
        )[0].innerHTML
      ).toDate();
      if (`${now}` === "Invalid Date")
        now = moment(
          document.getElementsByClassName(
            "react-calendar__navigation__label__labelText"
          )[0].innerHTML,
          "YYYY년 MM월"
        ).toDate();

      const year: number = now.getFullYear();
      const month: number = now.getMonth() + 1;

      const data = await farmLoadAll({
        farmId: parseInt(params.id),
        year: year,
        month: month,
      });

      data.waterCycleResponses = [
        ...farmState.waterCycleResponses,
        ...data.waterCycleResponses,
      ];
      data.lightCycleResponses = [
        ...farmState.lightCycleResponses,
        ...data.lightCycleResponses,
      ];

      setFarmState(data);
    }
  };

  useEffect(() => {
    setFarmState({
      id: 0,
      farmName: "",
      farmCrop: "",
      createdDate: "",
      temperature: 0,
      airHumidity: 0,
      soilHumidity: 0,
      isWater: 0,
      isLight: 0,
      lastCycleDate: 0,
      waterCycleResponses: [],
      lightCycleResponses: [],
      year: 0,
      month: 0,
    });

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Title>
        <span
          onClick={() => {
            setModalState({
              title: "농장 수정",
              modalContents: <FarmUpdateModal />,
            });
          }}
        >
          <img src={Edit} alt="edit farm" />
          농장 수정
        </span>
        <span
          onClick={() => {
            setFarmState({
              id: 0,
              farmName: "",
              farmCrop: "",
              createdDate: "",
              temperature: 0,
              airHumidity: 0,
              soilHumidity: 0,
              isWater: 0,
              isLight: 0,
              lastCycleDate: 0,
              waterCycleResponses: [],
              lightCycleResponses: [],
              year: 0,
              month: 0,
            });
            fetchData();
          }}
        >
          <img src={Refresh} alt="create farm" />
          새로고침
        </span>
      </Title>
      <InfoWrapper>
        <div>
          <DateInfo
            key={farmState.id}
            lightCycleResponses={
              farmState.lightCycleResponses
                ? farmState.lightCycleResponses
                : [""]
            }
            waterCycleResponses={
              farmState.waterCycleResponses
                ? farmState.waterCycleResponses
                : [""]
            }
          />
        </div>
        <div>
          <span>
            <Switch
              type="water"
              isChecked={Boolean(parseInt(farmState.isWater as string))}
              id="water"
              label="물 주기"
            />
            <Switch
              type="light"
              isChecked={Boolean(parseInt(farmState.isLight as string))}
              id="light"
              label="빛 주기"
            />
          </span>
          <span>
            물을 안 준 지 <strong>{farmState.lastCycleDate}</strong> 일이
            지났습니다.
          </span>
          <FarmInfo
            temperature={Math.round(farmState.temperature)}
            soilHumidity={Math.round((farmState.soilHumidity / 4095) * 100)}
            airHumidity={Math.round(farmState.airHumidity)}
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
