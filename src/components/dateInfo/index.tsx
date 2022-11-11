import { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { pxToRem } from "../../utils/pxToRem";

interface DateInfoProps {
  baskedDate: string[];
  wateredDate: string[];
}

const DateInfo = ({ baskedDate, wateredDate }: DateInfoProps) => {
  const now: number = Date.now();

  const [value, onChange] = useState(new Date());

  return (
    <Wrapper>
      <Calendar
        onChange={onChange}
        value={value}
        minDetail="month"
        maxDetail="month"
        tileContent={() => <Tile />}
        tileClassName={({ date }): string => {
          if (date.getTime() < now) {
            if (
              wateredDate.find(
                (watered) => watered === moment(date).format("YY-MM-DD")
              ) &&
              baskedDate.find(
                (basked) => basked === moment(date).format("YY-MM-DD")
              )
            )
              return "perfect";
            else if (
              wateredDate.find(
                (watered) => watered === moment(date).format("YY-MM-DD")
              )
            )
              return "watered";
            else if (
              baskedDate.find(
                (basked) => basked === moment(date).format("YY-MM-DD")
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

    &__month-view__weekdays {
      margin-top: ${pxToRem(8)}rem;
      margin-bottom: ${pxToRem(8)}rem;

      abbr {
        text-decoration: none;
      }

      &__weekday {
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

      > div {
        transition: background-color 0.25s ease;
      }

      :hover {
        background-color: transparent;

        > div {
          background-color: #e6e6e6;
        }
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
