import styled from "styled-components";
import { Close } from "../../assets/images";
import { pxToRem } from "../../utils/functions/pxToRem";

const FarmCard = () => {
  return (
    <Background>
      <Wrapper>
        <h1>농장 이름</h1>
        <div>
          <span>상추</span>
          <span>22-10-18</span>
        </div>
        <img src={Close} alt="close" />
      </Wrapper>
      <Wrapper>
        <ul>
          <li>토양 습도 : 75%</li>
          <li>온도 : 23.5°C</li>
          <li>공기 습도 : 50%</li>
        </ul>
      </Wrapper>
    </Background>
  );
};

export default FarmCard;

const Background = styled.div`
  @media screen and (max-width: 1260px) {
    margin-right: 1%;
    width: 44.75%;
  }

  transform: translateY(0);

  padding: calc(0.5rem + 1vh);
  margin-bottom: ${pxToRem(25)}rem;
  margin-right: 2%;

  width: 28.25%;

  display: inline-flex;
  flex-direction: column;

  border-radius: 1.5rem;
  box-shadow: 0 0 0.5rem ${({ theme }) => theme.color.grey};

  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;

  :hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 0 0.5rem ${({ theme }) => theme.color.lightGrey};
  }
`;

const Wrapper = styled.div`
  width: 100%;

  display: flex;

  :first-of-type {
    padding-bottom: 0.625vh;
    margin-bottom: 1.25vh;

    border-bottom: 0.1px solid ${({ theme }) => theme.color.grey};
  }

  > h1 {
    margin-right: ${pxToRem(16)}rem;

    font-size: 4.2vh;
    ${({ theme }) => theme.common.gb};
    word-break: keep-all;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  > img {
    margin-left: auto;

    width: 1.25vh;
    height: 1.25vh;

    transition: filter 0.25s ease;
    filter: grayscale(1);

    ${({ theme }) => theme.common.hoverEffectRed}
  }

  ul {
    display: flex;
    flex-flow: row wrap;

    > li {
      width: 50%;

      list-style-position: inside;
    }
  }

  span,
  li {
    color: ${({ theme }) => theme.color.darkGrey};
    font-size: 1.75vh;
  }
`;
