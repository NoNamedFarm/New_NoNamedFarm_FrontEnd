import styled from "styled-components";
import Banner from "../../components/banner";
import Button from "../../components/button";
import InputField from "../../components/input";
import { pxToRem } from "../../utils/pxToRem";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginRequestType } from "../../assets/types/user/login/request";
import { userLogin } from "../../apis/user/login";

function LoginPage() {
  const [loginState, setLoginState] = useState<LoginRequestType>({
    userId: "",
    password: "",
  });
  const [warning, setWarning] = useState<LoginRequestType>({
    userId: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateForm = (): boolean => {
    let temp = Object.assign({}, warning);

    if (loginState.userId === "") {
      temp = {
        userId: "값이 입력되지 않았습니다.",
        password: "",
      };
      setWarning(temp);
      return false;
    } else temp.userId = "";

    if (loginState.password === "") {
      temp = {
        userId: "",
        password: "값이 입력되지 않았습니다.",
      };
      setWarning(temp);
      return false;
    } else temp.password = "";

    if (temp.userId.length < 2 && temp.userId.length > 10) {
      temp.userId = "아이디 형식이 올바르지 않습니다.";
      setWarning(temp);
      return false;
    } else temp.userId = "";

    if (
      !String(loginState.password).match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/
      )
    ) {
      temp.password = "비밀번호 형식이 올바르지 않습니다.";
      setWarning(temp);
      return false;
    } else temp.password = "";

    setWarning(temp);
    return true;
  };

  const onSubmit = async () => {
    if (validateForm()) {
      const response = await userLogin(loginState);
      if (response === true) navigate("/menu?contents=farm");
      else {
        if (response === 400) {
          let temp = Object.assign({}, warning);
          temp = {
            userId: "",
            password: "비밀번호가 일치하지 않습니다.",
          };
          setWarning(temp);
        }
        if (response === 404) {
          let temp = Object.assign({}, warning);
          temp = {
            userId: "해당 아이디로 가입된 계정이 존재하지 않습니다.",
            password: "",
          };
          setWarning(temp);
        }
      }
    }
  };

  return (
    <Background>
      <Banner />
      <Wrapper>
        <h1>로그인</h1>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <InputField
            type="normal"
            label="아이디"
            id="id"
            placeholder="2 ~ 10 글자"
            minLength={2}
            maxLength={10}
            warning={warning.userId}
            value={loginState.userId}
            setValue={(userId: string) => {
              let temp = Object.assign({}, loginState);
              temp.userId = userId;
              setLoginState(temp);
            }}
          />
          <InputField
            type="password"
            label="비밀번호"
            id="pw"
            minLength={6}
            maxLength={20}
            warning={warning.password}
            value={loginState.password}
            setValue={(password: string) => {
              let temp = Object.assign({}, loginState);
              temp.password = password;
              setLoginState(temp);
            }}
          />
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

const Wrapper = styled.div`
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
