import styled from "styled-components";
import { pxToRem } from "../../../utils/pxToRem";
import FarmCard from "../../farmCard";
import { Link } from "react-router-dom";
import { Create } from "../../../assets/images";

const FarmMenu = () => {
  return (
    <Background>
      <MenuWrapper>
        <Link to="/menu/farm">나의 농장</Link>
        <Link to="/menu/journal">나의 일지</Link>
      </MenuWrapper>
      <span>
        <span>
          <img src={Create} alt="create farm" />
          농장 생성
        </span>
      </span>
      <FarmWrapper>
        <FarmCard />
        <FarmCard />
        <FarmCard />
        <FarmCard />
      </FarmWrapper>
    </Background>
  );
};

export default FarmMenu;

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
      display: flex;
      align-items: center;

      color: ${({ theme }) => theme.colors.grey1f};
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

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey1f};

  a {
    width: ${pxToRem(136)}rem;
    height: ${pxToRem(48)}rem;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: ${({ theme }) => theme.fontSizes.subText};
    text-decoration: none;

    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey1f};
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    transition: color 0.25s ease, background-color 0.25s ease;
    cursor: pointer;

    :hover {
      background-color: #eee;
    }

    :nth-child(1) {
      color: ${({ theme }) => theme.colors.green};

      border: 1px solid ${({ theme }) => theme.colors.grey1f};
      border-bottom: 1px solid ${({ theme }) => theme.colors.white};
    }
  }
`;

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
