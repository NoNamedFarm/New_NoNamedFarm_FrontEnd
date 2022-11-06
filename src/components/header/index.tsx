import { Link } from "react-router-dom";
import styled from "styled-components";
import { ProjectLogo } from "../../assets/images";
import { pxToRem } from "../../utils/pxToRem";

const Header = () => {
  return (
    <Background>
      <Logo to="/menu/farm">
        <img src={ProjectLogo} alt="Logo" />
      </Logo>
    </Background>
  );
};

export default Header;

const Background = styled.header`
  background-color: ${({ theme }) => theme.colors.white};

  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: ${pxToRem(80)}rem;

  display: flex;
  align-items: center;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey1f};
  z-index: 99;
`;

const Logo = styled(Link)`
  margin-left: calc(15% - ${pxToRem(20)}rem);

  display: flex;
  align-items: center;

  text-decoration: none;

  ${({ theme }) => theme.common.hoverEffect}

  h1 {
    margin-left: ${pxToRem(8)}rem;

    color: ${({ theme }) => theme.colors.grey1f};
    font-size: ${({ theme }) => theme.fontSizes.description};
  }
`;
