import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProjectLogo } from "../../assets/images";
import { pxToRem } from "../../utils/pxToRem";
import { useEffect, useState } from "react";
import * as C from "../../utils/cookie";
import { userLogout } from "../../apis/user/logout";
import { useRecoilState } from "recoil";
import { userStateAtom, userStateAtomType } from "../../atoms/userState";

const Header = () => {
  const [, setUserState] = useRecoilState<userStateAtomType>(userStateAtom);

  const [hideHeaderState, setHideHeaderState] = useState<boolean>(false);

  const navigate = useNavigate();

  const loginState = C.getCookie("accessToken");

  useEffect(() => {
    let prevScrollTop = 0;
    const toggleHeader = () => {
      const nextScrollTop = window.pageYOffset || 0;
      if (prevScrollTop > 45 && nextScrollTop > prevScrollTop) {
        setHideHeaderState(true);
      } else if (nextScrollTop < prevScrollTop) {
        setHideHeaderState(false);
      }
      prevScrollTop = nextScrollTop;
    };
    document.addEventListener("scroll", toggleHeader);
    return () => document.removeEventListener("scroll", toggleHeader);
  }, []);

  return (
    <Wrapper hideHeaderState={hideHeaderState}>
      <Logo to={loginState ? "/menu?contents=farm" : "/"}>
        <img src={ProjectLogo} alt="Logo" />
      </Logo>
      {loginState ? (
        <Nav>
          <button
            onClick={() => {
              userLogout();
              setUserState({
                nickname: "",
                createDate: 0,
                totalFarm: 0,
                totalDiary: 0,
              });
              navigate("/");
            }}
          >
            로그아웃
          </button>
        </Nav>
      ) : (
        <Nav>
          <Link to="/login">로그인</Link>
          <Link to="/register">가입</Link>
        </Nav>
      )}
    </Wrapper>
  );
};

export default Header;

interface WrapperProps {
  hideHeaderState: boolean;
}

const Wrapper = styled.header<WrapperProps>`
  background-color: ${({ theme }) => theme.colors.white};

  position: fixed;
  ${(props) => (props.hideHeaderState ? `top: ${pxToRem(-80)}rem;` : "top: 0;")}
  left: 0;

  padding-left: calc(20% - ${pxToRem(20)}rem);
  padding-right: 20%;

  width: 100vw;
  height: ${pxToRem(80)}rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey1f};
  z-index: 99;
  transition: top 0.25s ease;
`;

const Logo = styled(Link)`
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

const Nav = styled.div`
  a {
    margin-left: ${pxToRem(25)}rem;

    color: ${({ theme }) => theme.colors.grey1f};
    font-size: ${({ theme }) => theme.fontSizes.subText};
    text-decoration: none;

    ${({ theme }) => theme.common.hoverEffect}
  }

  button {
    background-color: transparent;

    margin-left: ${pxToRem(25)}rem;

    color: ${({ theme }) => theme.colors.grey1f};
    font-size: ${({ theme }) => theme.fontSizes.subText};
    text-decoration: none;

    border: none;

    ${({ theme }) => theme.common.hoverEffect}
  }
`;
