import styled from "styled-components";
import Banner from "../../components/banner";
import Button from "../../components/button";
import InputField from "../../components/input";
import { pxToRem } from "../../utils/pxToRem";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <Background>
      <Banner />
      <Wrapper>
        <h1>로그인</h1>
        <form>
          <InputField type="normal" label="아이디" id="id" />
          <InputField type="password" label="비밀번호" id="pw" />
          <InputField type="checkbox" label="아이디 기억" id="remember" />
          <Button type="normal" label="로그인" />
        </form>
        <span>
          계정이 없으신가요? <Link to={"/register"}>회원가입</Link>
        </span>
      </Wrapper>
    </Background>
  );
}

export default LoginPage;

const Background = styled.div`
  display: flex;
`;

const Wrapper = styled.form`
  @media screen and (max-width: 800px) {
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
  }

  padding: ${pxToRem(25)}rem;

  width: 50%;
  min-height: 50rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: ${pxToRem(25)}rem;

    font-size: ${({ theme }) => theme.fontSizes.title};
    ${({ theme }) => theme.common.gb}
  }

  span {
    margin-top: ${pxToRem(25)}rem;

    font-size: ${({ theme }) => theme.fontSizes.description};

    > a {
      text-decoration: none;

      transition: color 0.25s ease;

      :hover {
        color: ${({ theme }) => theme.colors.grey2f};
      }
    }
  }
`;
