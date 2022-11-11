import styled from "styled-components";
import { pxToRem } from "../../utils/pxToRem";
import Gauge from "../gauge";

interface FarmInfoProps {
  temperature: number;
  soilHumidity: number;
  airHumidity: number;
}

const FarmInfo = ({
  temperature,
  soilHumidity,
  airHumidity,
}: FarmInfoProps) => {
  return (
    <GaugeWrapper>
      <Gauge
        label="대기 온도 (℃)"
        type="temperature"
        min={-20}
        max={80}
        value={temperature}
      />
      <Gauge
        label="토양 습도 (%)"
        type="soilHumidity"
        min={0}
        max={100}
        value={soilHumidity}
      />
      <Gauge
        label="대기 습도 (%)"
        type="airHumidity"
        min={0}
        max={100}
        value={airHumidity}
      />
    </GaugeWrapper>
  );
};

const GaugeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default FarmInfo;
