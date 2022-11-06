import styled from "styled-components";
import { Close } from "../../assets/images";
import { pxToRem } from "../../utils/pxToRem";

const JournalCard = () => {
  return (
    <Background>
      <h1>2022-11-04</h1>
      <img src={Close} alt="close" />
    </Background>
  );
};

export default JournalCard;

const Background = styled.div`
  padding: calc(0.5rem + 1vh);
  margin-bottom: ${pxToRem(25)}rem;

  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 1.5rem;
  box-shadow: 0 0 0.5rem ${({ theme }) => theme.colors.grey2f};
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;

  :hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 0 0.5rem ${({ theme }) => theme.colors.grey1f};
  }

  > h1 {
    font-size: ${({ theme }) => theme.fontSizes.subText};
  }

  > img {
    margin-left: auto;

    width: 1.25vh;
    height: 1.25vh;

    filter: grayscale(1);

    ${({ theme }) => theme.common.hoverEffectRed}
  }
`;
