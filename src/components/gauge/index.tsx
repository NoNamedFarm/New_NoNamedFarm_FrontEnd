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

    width: ${pxToRem(256)}rem;

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
  width: ${pxToRem(240)}rem;
  margin-top: ${pxToRem(25)}rem;
  margin-bottom: ${pxToRem(25)}rem;

  > div {
    position: absolute;

    transform: translateX(0.5rem) translateY(-1.5rem);

    width: ${pxToRem(240)}rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    z-index: 2;

    span {
      font-size: ${({ theme }) => theme.fontSizes.description};

      z-index: 2;
    }
  }

  input {
    all: unset;

    background-color: ${(props) =>
      props.type === "temperature"
        ? ({ theme }) => theme.colors.temperature
        : ({ theme }) => theme.colors.humidity};

    margin-left: 0.5rem;

    width: 100%;

    border-radius: 1.5rem;
    z-index: 1;

    ::-webkit-slider-thumb {
      -webkit-appearance: none;

      background: ${({ theme }) => theme.colors.white};

      width: ${pxToRem(2)}rem;
      height: ${pxToRem(45)}rem;
    }
  }

  strong {
    position: absolute;

    padding-left: ${(props) =>
      props.value / (6.2 + (props.gap - 1) * 0.65) > 14.5
        ? 14.7
        : props.value / (6.1 + (props.gap - 1) * 0.65)}rem;

    width: 15rem;

    font-size: ${({ theme }) => theme.fontSizes.description};

    z-index: 2;
  }
`;
