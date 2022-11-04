import styled from "styled-components";
import { pxToRem } from "../../../utils/functions/pxToRem";
import JournalCard from "../../journalCard";
import { Link } from "react-router-dom";

const JournalMenu = () => {
  return (
    <Background>
      <MenuWrapper>
        <Link to="/farm">나의 농장</Link>
        <Link to="/journal">나의 일지</Link>
      </MenuWrapper>
      <span>
        <span>+ 일지 생성</span>
      </span>
      <JournalWrapper>
        <JournalCard />
        <JournalCard />
        <JournalCard />
        <JournalCard />
      </JournalWrapper>
    </Background>
  );
};

export default JournalMenu;

const Background = styled.div`
  margin-left: 15%;
  margin-right: 15%;

  width: 70%;

  > span {
    margin-top: ${pxToRem(25)}rem;
    margin-bottom: ${pxToRem(25)}rem;

    display: flex;
    justify-content: flex-end;

    > span {
      font-size: ${({ theme }) => theme.fontSize.description};

      ${({ theme }) => theme.common.hoverEffect}
    }
  }
`;

const MenuWrapper = styled.div`
  height: ${pxToRem(48)}rem;

  display: flex;

  border-bottom: 1px solid ${({ theme }) => theme.color.grey};

  a {
    background-color: transparent;

    width: ${pxToRem(136)}rem;
    height: ${pxToRem(48)}rem;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: ${({ theme }) => theme.fontSize.subText};
    text-decoration: none;

    border: none;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    transition: color 0.25s ease, background-color 0.25s ease;
    cursor: pointer;

    :hover {
      background-color: #eee;
    }

    :nth-child(2) {
      color: ${({ theme }) => theme.color.green};

      border: 1px solid ${({ theme }) => theme.color.grey};
      border-bottom: 1px solid #fff;
    }
  }
`;

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
