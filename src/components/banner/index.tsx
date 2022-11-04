import styled from "styled-components";
import { BannerImage } from "../../assets/images";
import { pxToRem } from "../../utils/functions/pxToRem";

const Banner = () => {
  return (
    <Wrapper>
      <h1>살려야한다</h1>
      <h2>NoNamed</h2>
    </Wrapper>
  );
};
export default Banner;

const Wrapper = styled.div`
  ::before {
    background-image: url(${BannerImage});
    background-size: cover;
    background-repeat: no-repeat;

    position: fixed;

    width: 50%;
    height: 100vh;

    content: "";
    filter: brightness(75%) blur(0.1rem);
  }

  padding: ${pxToRem(25)}rem;
  padding-left: 5vw;
  padding-right: 5vw;

  width: 50%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1,
  h2 {
    ${({ theme }) => theme.common.gb};

    filter: drop-shadow(0 0 0.5rem ${({ theme }) => theme.color.black});
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSize.title};
  }

  h2 {
    margin-bottom: ${pxToRem(25)}rem;

    font-size: ${({ theme }) => theme.fontSize.subHeading};
  }
`;
