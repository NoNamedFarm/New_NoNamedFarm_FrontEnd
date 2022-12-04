import styled from "styled-components";
import { pxToRem } from "../../utils/pxToRem";

interface GaugeProps {
  label: string;
  type: "temperature" | "soilHumidity" | "airHumidity";
  value: number;
  min: number;
  max: number;
}

const Gauge = ({ type, value, label, min, max }: GaugeProps) => {
  return (
    <Background>
      <span>{label}</span>
      <Wrapper
        type={type}
        value={type === "temperature" ? value + 20 : value}
        gap={value.toString().length}
      >
        <div>
          <span>{min}</span>
          <span>{max}</span>
        </div>
        <input
          key={value}
          type="range"
          min={min}
          max={max}
          defaultValue={value}
          disabled={true}
        />
        <strong>{value}</strong>
      </Wrapper>
    </Background>
  );
};

export default Gauge;

const Background = styled.div`
  > span {
    padding-bottom: ${pxToRem(8)}rem;
    margin-bottom: ${pxToRem(8)}rem;

    width: 100%;

    color: ${({ theme }) => theme.colors.grey1f};
    font-size: ${({ theme }) => theme.fontSizes.subText};

    border-bottom: 1px solid ${({ theme }) => theme.colors.grey1f};
  }

  display: inline-flex;
  flex-direction: column;
  justify-content: center;
`;

interface WrapperProps {
  type: string;
  value: number;
  gap: number;
}

const Wrapper = styled.div<WrapperProps>`
  margin-top: ${pxToRem(4)}rem;
  margin-bottom: ${pxToRem(4)}rem;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    margin-bottom: ${pxToRem(4)}rem;

    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: ${({ theme }) => theme.colors.grey1f};
      font-size: ${({ theme }) => theme.fontSizes.subText};
    }
  }

  input {
    all: unset;

    background-color: ${(props) =>
      props.type === "temperature"
        ? ({ theme }) => theme.colors.temperature
        : ({ theme }) => theme.colors.humidity};

    width: 100%;

    border-radius: 1.5rem;

    ::-webkit-slider-thumb {
      -webkit-appearance: none;

      background: ${({ theme }) => theme.colors.white};

      width: ${pxToRem(2)}rem;
      height: ${pxToRem(24)}rem;
    }
  }

  strong {
    padding-left: ${(props) => `${props.value - 1 + (props.gap - 1) * -1.25}%`};
    margin-top: ${pxToRem(4)}rem;

    width: 100%;

    color: ${({ theme }) => theme.colors.grey1f};
    font-size: ${({ theme }) => theme.fontSizes.subText};
  }
`;
