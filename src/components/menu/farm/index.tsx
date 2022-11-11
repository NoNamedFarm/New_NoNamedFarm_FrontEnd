import styled from "styled-components";
import { pxToRem } from "../../../utils/pxToRem";
import FarmCard from "../../farmCard";

const FarmMenu = () => {
  return (
    <FarmWrapper>
      <FarmCard />
      <FarmCard />
      <FarmCard />
      <FarmCard />
    </FarmWrapper>
  );
};

export default FarmMenu;

const FarmWrapper = styled.div`
  margin-bottom: ${pxToRem(25)}rem;

  width: calc(100% + 5.75%);

  display: flex;
  flex-wrap: wrap;

  > div {
    margin-right: 5%;

    :last-of-type {
      margin-right: 0;
    }
  }
`;
