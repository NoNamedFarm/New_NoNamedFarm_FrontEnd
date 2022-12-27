import styled from "styled-components";
import Banner from "../../components/banner";
import Button from "../../components/button";
import InputField from "../../components/input";
import { pxToRem } from "../../utils/pxToRem";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { userCheck } from "../../apis/user/check";
import { userSignUp } from "../../apis/user/signUp";
import { useNavigate } from "react-router-dom";
import { RegisterRequestType } from "../../assets/types/user/registerType/request";

function RegisterPage() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [duplicateCheck, setDuplicateCheck] = useState<boolean>(false);
  const [registerState, setRegisterState] = useState<RegisterRequestType>({
    nickname: "",
    userId: "",
    password: "",
    passwordConfirm: "",
  });
  const [warning, setWarning] = useState<RegisterRequestType>({
    nickname: "",
    userId: "",
    password: "",
    passwordConfirm: "",
  });

  const navigate = useNavigate();

  const validateForm = (): boolean => {
    let temp = Object.assign({}, warning);

    if (registerState.userId === "") {
      temp = {
        nickname: "",
        userId: "값이 입력되지 않았습니다.",
        password: "",
        passwordConfirm: "",
      };
      setWarning(temp);
      return false;
    } else temp.userId = "";

    if (registerState.nickname === "") {
      temp = {
        nickname: "값이 입력되지 않았습니다.",
        userId: "",
        password: "",
        passwordConfirm: "",
      };
      setWarning(temp);
      return false;
    } else temp.nickname = "";

    if (registerState.password === "") {
      temp = {
        nickname: "",
        userId: "",
        password: "값이 입력되지 않았습니다.",
        passwordConfirm: "",
      };
      setWarning(temp);
      return false;
    } else temp.password = "";

    if (registerState.passwordConfirm === "") {
      temp = {
        nickname: "",
        userId: "",
        password: "",
        passwordConfirm: "값이 입력되지 않았습니다.",
      };
      setWarning(temp);
      return false;
    } else temp.passwordConfirm = "";

    if (temp.userId.length < 2 && temp.userId.length > 10) {
      temp.userId = "아이디 형식이 올바르지 않습니다.";
      setWarning(temp);
      return false;
    } else temp.userId = "";

    if (temp.nickname.length > 8) {
      temp.nickname = "닉네임 형식이 올바르지 않습니다.";
      setWarning(temp);
      return false;
    } else temp.nickname = "";

    if (
      !String(registerState.password).match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/
      )
    ) {
      temp.password = "비밀번호 형식이 올바르지 않습니다.";
      setWarning(temp);
      return false;
    } else temp.password = "";

    if (registerState.password !== registerState.passwordConfirm) {
      temp.passwordConfirm = "비밀번호가 일치하지 않습니다.";
      setWarning(temp);
      return false;
    } else temp.passwordConfirm = "";

    if (!duplicateCheck) {
      temp.userId = "아이디의 중복이 확인되지 않았습니다.";
      setWarning(temp);
      return false;
    } else temp.userId = "";

    setWarning(temp);
    return true;
  };

  const onSubmit = async () => {
    if (validateForm()) {
      if (await userSignUp(registerState)) navigate("/menu");
    }
  };

  return (
    <Background>
      <Banner />
      <Wrapper>
        <h1>회원가입</h1>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <InputField
            type="duplicateCheck"
            label="아이디"
            id="id"
            placeholder="2 ~ 10 글자"
            minLength={2}
            maxLength={10}
            warning={warning.userId}
            value={registerState.userId}
            setValue={(userId: string) => {
              if (duplicateCheck) setDuplicateCheck(false);
              let temp = Object.assign({}, registerState);
              temp.userId = userId;
              setRegisterState(temp);
            }}
            duplicateCheckState={duplicateCheck}
            duplicateCheck={async () => {
              const data: boolean | number = await userCheck(
                registerState.userId
              );
              let temp = Object.assign({}, warning);

              if (data === true) {
                setDuplicateCheck(data);
                temp.userId = "";
                setWarning(temp);
              } else if (data === 409) {
                temp.userId = "이미 사용중인 아이디입니다.";
                setWarning(temp);
              }
            }}
          />
          <InputField
            type="normal"
            label="닉네임"
            id="nickname"
            placeholder="1 ~ 4 글자"
            minLength={1}
            maxLength={4}
            warning={warning.nickname}
            value={registerState.nickname}
            setValue={(nickname: string) => {
              let temp = Object.assign({}, registerState);
              temp.nickname = nickname;
              setRegisterState(temp);
            }}
          />
          <InputField
            type="password"
            label="비밀번호"
            id="pw"
            minLength={8}
            maxLength={24}
            warning={warning.password}
            value={registerState.password}
            setValue={(password: string) => {
              let temp = Object.assign({}, registerState);
              temp.password = password;
              setRegisterState(temp);
            }}
          />
          <InputField
            type="password"
            label="비밀번호 확인"
            id="pwconfirm"
            warning={warning.passwordConfirm}
            value={registerState.passwordConfirm}
            setValue={(passwordConfirm: string) => {
              let temp = Object.assign({}, registerState);
              temp.passwordConfirm = passwordConfirm;
              setRegisterState(temp);
            }}
          />
          <InputField
            type="checkbox"
            label="본 서비스의 이용 약관에 동의합니다."
            id="agree"
            refObj={buttonRef}
          />
          <Button type="normal" label="회원가입" refObj={buttonRef} />
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

const Wrapper = styled.div`
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
