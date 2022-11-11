import styled from "styled-components";
import { About } from "../../assets/constants/about";
import { Background } from "../../assets/images";
import Header from "../../components/header";
import InfoCard from "../../components/infoCard";
import { pxToRem } from "../../utils/pxToRem";

function MainPage() {
  return (
    <Image>
      <Header />
      <Wrapper>
        <div>
          <Title>
            <h1>NoNamed</h1>
            <p>{About}</p>
          </Title>
          <InfoCard />
        </div>
      </Wrapper>
    </Image>
  );
}

export default MainPage;

const Image = styled.div`
  position: fixed;

  background: url(${Background}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  padding-top: ${pxToRem(80)}rem;
  margin-bottom: ${pxToRem(50)}rem;
  margin-left: 20%;
  margin-right: 20%;

  width: 60%;
  height: auto;
  min-height: calc(100vh - 6rem);

  @media screen and (max-width: 1260px) {
    display: flex;
    flex-direction: column;
  }

  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  @media screen and (max-width: 1260px) {
    > h1 {
      margin-top: ${pxToRem(50)}rem;
    }
  }
  > h1 {
    padding-bottom: ${pxToRem(16)}rem;

    font-size: ${({ theme }) => theme.fontSizes.title};
  }
  > p {
    padding-top: ${pxToRem(25)}rem;
    margin-bottom: ${pxToRem(25)}rem;

    color: ${({ theme }) => theme.colors.grey1f};
    font-size: ${({ theme }) => theme.fontSizes.subText};

    border-top: 1px solid ${({ theme }) => theme.colors.grey1f};
  }
`;
