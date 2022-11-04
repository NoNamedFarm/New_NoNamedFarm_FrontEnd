import styled from "styled-components";
import { ProjectLogo } from "../../assets/images";
import { pxToRem } from "../../utils/functions/pxToRem";

const Header = () => {
  return (
    <Background>
      <Logo>
        <img src={ProjectLogo} alt="Logo" />
      </Logo>
    </Background>
  );
};

export default Header;

const Background = styled.header`
  background-color: #fff;

  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: ${pxToRem(80)}rem;

  display: flex;
  align-items: center;

  border-bottom: 1px solid ${({ theme }) => theme.color.grey};
  z-index: 99;
`;

const Logo = styled.div`
  margin-left: calc(15% - ${pxToRem(20)}rem);

  display: flex;
  align-items: center;

  h1 {
    margin-left: ${pxToRem(8)}rem;
    font-size: ${({ theme }) => theme.fontSize.text};
  }
`;
