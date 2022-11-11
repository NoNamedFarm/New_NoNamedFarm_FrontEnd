import styled from "styled-components";
import { pxToRem } from "../../../utils/pxToRem";
import JournalCard from "../../journalCard";

const JournalMenu = () => {
  return (
    <JournalWrapper>
      <JournalCard />
      <JournalCard />
      <JournalCard />
      <JournalCard />
    </JournalWrapper>
  );
};

export default JournalMenu;

const JournalWrapper = styled.div`
  margin-bottom: ${pxToRem(25)}rem;

  width: 100%;
  height: ${pxToRem(48)}rem;

  display: flex;
  flex-wrap: wrap;

  > div {
    margin-bottom: ${pxToRem(25)}rem;

    :last-of-type {
      margin-bottom: 0;
    }
  }
`;
