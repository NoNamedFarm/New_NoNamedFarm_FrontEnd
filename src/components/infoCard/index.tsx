import styled from "styled-components";
import {
  InfoCardContents,
  InfoCardIconsAlt,
} from "../../assets/constants/about";
import { InfoCardIcons } from "../../assets/images";
import { pxToRem } from "../../utils/pxToRem";

interface InfoCardProps {
  index: number;
}

const InfoCard = ({ index }: InfoCardProps) => {
  return (
    <Wrapper key={index}>
      <img src={InfoCardIcons[index]} alt={InfoCardIconsAlt[index]} />
      <p>{InfoCardContents[index]}</p>
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

  @keyframes Flash {
    from {
      filter: brightness(300%);
    }
    to {
      filter: brightness(100%);
    }
  }

  animation: Flash 0.25s ease;
`;
