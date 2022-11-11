import styled from "styled-components";
import { BannerImage } from "../../assets/images";

const Banner = () => {
  return <Background src={BannerImage} alt="banner image" />;
};
export default Banner;

const Background = styled.img`
  @media screen and (max-width: 800px) {
    display: none;
  }

  width: 50%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  object-fit: cover;
`;
