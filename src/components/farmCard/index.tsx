import { Link } from "react-router-dom";
import styled from "styled-components";
import { Close } from "../../assets/images";
import { pxToRem } from "../../utils/pxToRem";

const FarmCard = () => {
  const id = 1;

  return (
    <Background to={`/farm/:${id}`}>
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

const Background = styled(Link)`
  @media screen and (max-width: 1260px) {
    margin-right: 1%;
    width: 44.75%;
  }

  padding: calc(0.5rem + 1vh);
  margin-bottom: ${pxToRem(25)}rem;
  margin-right: 2%;

  width: 28.25%;

  display: inline-flex;
  flex-direction: column;

  text-decoration: none;

  border-radius: 1.5rem;
  box-shadow: 0 0 0.5rem ${({ theme }) => theme.colors.grey2f};
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;

  :hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 0 0.5rem ${({ theme }) => theme.colors.grey1f};
  }
`;

const Wrapper = styled.div`
  width: 100%;

  display: flex;

  :first-of-type {
    padding-bottom: 0.625vh;
    margin-bottom: 1.25vh;

    border-bottom: 0.1px solid ${({ theme }) => theme.colors.grey1f};
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
    font-size: 1.75vh;
  }
`;
