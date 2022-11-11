import styled from "styled-components";
import {
  InfoCardContents,
  InfoCardIconsAlt,
} from "../../assets/constants/about";
import { InfoCardIcons } from "../../assets/images";
import { pxToRem } from "../../utils/pxToRem";

const InfoCard = () => {
  return (
    <Wrapper>
      <img src={InfoCardIcons[0]} alt={InfoCardIconsAlt[0]} />
      <p>{InfoCardContents[0]}</p>
    </Wrapper>
  );
};

export default InfoCard;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};

  padding: ${pxToRem(25)}rem;

  width: ${pxToRem(390)}rem;
  height: ${pxToRem(600)}rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.common.boxShadow}

  > img {
    margin-bottom: ${pxToRem(25)}rem;
  }

  > p {
    color: ${({ theme }) => theme.colors.grey1f};
    font-size: ${({ theme }) => theme.fontSizes.subText};

    word-break: keep-all;
    text-align: center;
  }
`;
