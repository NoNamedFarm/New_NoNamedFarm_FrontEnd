import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { pxToRem } from "../../utils/pxToRem";
import { useEffect } from "react";
import { farmLoadCycle } from "../../apis/farm/loadCycle";
import { useRecoilState } from "recoil";
import { farmStateAtom, farmStateAtomType } from "../../atoms/farmState";
import { FarmCycleResponseType } from "../../assets/types/farm/cycle/response";

interface DateInfoProps {
  waterCycleResponses: string[];
  lightCycleResponses: string[];
}

const DateInfo = ({
  waterCycleResponses,
  lightCycleResponses,
}: DateInfoProps) => {
  const [farmState, setFarmState] =
    useRecoilState<farmStateAtomType>(farmStateAtom);

  const now: number = Date.now();

  const updateCycles = () => {
    setTimeout(async () => {
      const temp: farmStateAtomType = Object.assign({}, farmState);

      const now = moment(
        document.getElementsByClassName(
          "react-calendar__navigation__label__labelText"
        )[0].innerHTML,
        "YYYY년 MM월"
      ).toDate();

      const year: number = now.getFullYear();
      const month: number = now.getMonth() + 1;

      const cycles: FarmCycleResponseType = (await farmLoadCycle({
        farmId: temp.id,
        year: year,
        month: month,
      })) as FarmCycleResponseType;

      if (cycles) {
        temp.waterCycleResponses = [
          ...temp.waterCycleResponses,
          ...cycles.waterCycleResponses,
        ];
        temp.lightCycleResponses = [
          ...temp.lightCycleResponses,
          ...cycles.lightCycleResponses,
        ];
        temp.year = year;
        temp.month = month;

        setFarmState(temp);
      }
    });
  };

  useEffect(() => {
    const navArrow = document.getElementsByClassName(
      "react-calendar__navigation__arrow"
    );

    navArrow[0].addEventListener("click", updateCycles);
    navArrow[1].addEventListener("click", updateCycles);
    navArrow[2].addEventListener("click", updateCycles);
    navArrow[3].addEventListener("click", updateCycles);

    return () => {
      if (navArrow[0] !== undefined)
        navArrow[0].removeEventListener("click", updateCycles);
      if (navArrow[1] !== undefined)
        navArrow[1].removeEventListener("click", updateCycles);
      if (navArrow[2] !== undefined)
        navArrow[2].removeEventListener("click", updateCycles);
      if (navArrow[3] !== undefined)
        navArrow[3].removeEventListener("click", updateCycles);
    };
  }, [farmState]);

  return (
    <Wrapper>
      <Calendar
        showFixedNumberOfWeeks={true}
        minDetail="month"
        maxDetail="month"
        tileContent={() => <Tile />}
        tileClassName={({ date }): string => {
          if (date.getTime() < now) {
            if (
              waterCycleResponses.find(
                (watered) => watered === moment(date).format("YYYY-MM-DD")
              ) &&
              lightCycleResponses.find(
                (basked) => basked === moment(date).format("YYYY-MM-DD")
              )
            )
              return "perfect";
            else if (
              waterCycleResponses.find(
                (watered) => watered === moment(date).format("YYYY-MM-DD")
              )
            )
              return "watered";
            else if (
              lightCycleResponses.find(
                (basked) => basked === moment(date).format("YYYY-MM-DD")
              )
            )
              return "basked";
            else return "";
          } else return "";
        }}
      />
      <InfoWrapper>
        <span>
          <strong /> : 모두 준 날
        </span>
        <span>
          <strong /> : 물을 준 날
        </span>
        <span>
          <strong /> : 빛을 준 날
        </span>
      </InfoWrapper>
    </Wrapper>
  );
};

const Tile = styled.div`
  position: absolute;

  width: ${pxToRem(60)}rem;
  height: ${pxToRem(60)}rem;

  border-radius: 50%;
  z-index: 0;
`;

const Wrapper = styled.div`
  padding: ${pxToRem(25)}rem;

  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ theme }) => theme.common.boxShadow}

  abbr,
  button {
    position: relative;

    font-size: ${({ theme }) => theme.fontSizes.subText};
    word-break: keep-all;

    z-index: 1;
  }

  .react-calendar {
    width: 100%;

    border-radius: 1.5rem;
    border: none;

    &__navigation__label:disabled {
      background-color: transparent;
    }

    &__month-view__days__day--neighboringMonth {
      abbr {
        color: ${({ theme }) => theme.colors.grey1f};
      }
    }

    &__month-view__weekdays__weekday {
      margin-top: ${pxToRem(8)}rem;
      margin-bottom: ${pxToRem(8)}rem;

      :nth-of-type(6) {
        abbr {
          color: ${({ theme }) => theme.colors.temperature};
        }
      }
      :nth-of-type(7) {
        abbr {
          color: ${({ theme }) => theme.colors.humidity};
        }
      }
    }

    &__tile {
      background-color: transparent;

      width: ${pxToRem(64)}rem;
      height: ${pxToRem(64)}rem;

      display: flex;
      justify-content: center;
      align-items: center;

      &--active {
        background-color: transparent !important;
      }

      :hover {
        background-color: transparent;

        cursor: default !important;
      }

      &.perfect {
        :hover,
        :focus {
          > div {
            background-color: #bfedab;
          }
        }

        > div {
          background-color: #9fe481;
        }
      }

      &.watered {
        :hover,
        :focus {
          > div {
            background-color: #d2edf9;
          }
        }

        > div {
          background-color: #a5daf3;
        }
      }

      &.basked {
        :hover,
        :focus {
          > div {
            background-color: #f9f0b3;
          }
        }

        > div {
          background-color: #f6e785;
        }
      }
    }

    @media screen and (max-width: 1620px) {
      margin-left: 0;
    }
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;

  span {
    margin-top: ${pxToRem(8)}rem;

    display: flex;
    align-items: center;

    font-size: ${({ theme }) => theme.fontSizes.subText};

    :nth-child(1) {
      > strong {
        background-color: ${({ theme }) => theme.colors.green};
      }
    }

    :nth-child(2) {
      > strong {
        background-color: #7791ef;
      }
    }

    :nth-child(3) {
      > strong {
        background-color: #e9cd6d;
      }
    }

    > strong {
      margin-right: ${pxToRem(6)}rem;

      width: ${({ theme }) => theme.fontSizes.subText};
      height: ${({ theme }) => theme.fontSizes.subText};

      display: flex;

      border-radius: 50%;
    }
  }
`;

export default DateInfo;
