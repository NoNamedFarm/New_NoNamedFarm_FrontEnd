import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { About } from "../../assets/constants/about";
import { BackgroundImage, LeftArrow, RightArrow } from "../../assets/images";
import Header from "../../components/header";
import InfoCard from "../../components/infoCard";
import { pxToRem } from "../../utils/pxToRem";

function MainPage() {
  const [index, setIndex] = useState<number>(0);

  const isDesktop = useMediaQuery({ query: "(min-width: 1728px)" });
  const isCompatible = useMediaQuery({ query: "(min-width: 640px)" });

  const prevIndex = () => {
    if (isDesktop) {
      if (index - 2 < 0) setIndex(4);
      else setIndex(index - 2);
    } else {
      if (index - 1 < 0) setIndex(5);
      else setIndex(index - 1);
    }
  };
  const nextIndex = () => {
    if (isDesktop) {
      if (index + 2 > 5) setIndex(0);
      else setIndex(index + 2);
    } else {
      if (index + 1 > 5) setIndex(0);
      else setIndex(index + 1);
    }
  };

  return (
    <Background>
      <Header />
      <Wrapper>
        <Title>
          <h1>NoNamed</h1>
          <p>{About}</p>
        </Title>
        {isCompatible && (
          <CardWrapper>
            <img src={LeftArrow} alt="move left" onClick={() => prevIndex()} />
            <InfoCard index={index} />
            {isDesktop && <InfoCard index={index + 1} />}
            <img
              src={RightArrow}
              alt="move right"
              onClick={() => nextIndex()}
            />
          </CardWrapper>
        )}
      </Wrapper>
    </Background>
  );
}

export default MainPage;

const Background = styled.div`
  position: fixed;

  background: linear-gradient(
      181.4deg,
      #8cd5a1 1.18%,
      rgba(255, 255, 255, 0) 65.99%
    ),
    url(${BackgroundImage}) no-repeat center center fixed;
  background-size: cover;

  width: 100vw;
  height: 100vh;

  > header {
    background-color: transparent;

    position: relative;

    border-bottom: none;

    a {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const Wrapper = styled.div`
  margin-bottom: ${pxToRem(50)}rem;
  margin-left: 20%;
  margin-right: 20%;

  width: 60%;
  height: auto;
  min-height: calc(100vh - 6rem);

  display: flex;
  align-items: center;

  @media screen and (max-width: 1260px) {
    display: flex;
    flex-direction: column;
  }
`;

const Title = styled.div`
  @media screen and (max-width: 1260px) {
    margin-top: ${pxToRem(50)}rem;
    margin-bottom: ${pxToRem(50)}rem;

    width: 100%;
  }

  > h1 {
    margin-bottom: ${pxToRem(16)}rem;

    font-size: ${({ theme }) => theme.fontSizes.subTitle};
  }

  > p {
    color: ${({ theme }) => theme.colors.grey3f};
    font-size: ${({ theme }) => theme.fontSizes.subText};
  }
`;

const CardWrapper = styled.div`
  > div + div {
    margin-left: ${pxToRem(25)}rem;
  }

  @media screen and (max-width: 1260px) {
    width: calc(100% + ${pxToRem(140)}rem);

    > div {
      width: 100%;
      height: 100%;
    }
  }

  display: flex;
  justify-content: space-between;
  align-items: center;

  > img {
    position: relative;

    z-index: 1;

    ${({ theme }) => theme.common.hoverEffect}

    :first-of-type {
      transform: translateX(2.25rem);
    }
    :last-of-type {
      transform: translateX(-2.25rem);
    }
  }
`;
