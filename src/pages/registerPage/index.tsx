import styled from "styled-components";
import Banner from "../../components/banner";
import Button from "../../components/button";
import InputField from "../../components/input";
import { pxToRem } from "../../utils/pxToRem";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <Background>
      <Banner />
      <Wrapper>
        <h1>회원가입</h1>
        <form>
          <InputField type="duplicateCheck" label="아이디" id="id" />
          <InputField type="normal" label="닉네임" id="nickname" />
          <InputField type="password" label="비밀번호" id="pw" />
          <InputField type="password" label="비밀번호 확인" id="pwconfirm" />
          <InputField
            type="checkbox"
            label="본 서비스의 이용 약관에 동의합니다."
            id="agree"
          />
          <Button type="normal" label="회원가입" />
        </form>
        <span>
          계정이 있으신가요? <Link to="/login">로그인</Link>
        </span>
      </Wrapper>
    </Background>
  );
}

export default RegisterPage;

const Background = styled.div`
  @media screen and (max-width: 800px) {
    h1,
    span {
      text-align: center;
    }
  }

  display: flex;
`;

const Wrapper = styled.form`
  @media screen and (max-width: 800px) {
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;

    > form {
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
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
