import axios from "axios";
import { RegisterRequestType } from "../../../assets/types/user/registerType/request";
import { RegisterResponseType } from "../../../assets/types/user/registerType/response";
import { setCookie } from "../../../utils/cookie";

export const userSignUp = async ({
  nickname,
  userId,
  password,
}: RegisterRequestType): Promise<boolean | number> =>
  await axios
    .post<RegisterResponseType>(
      `${process.env.REACT_APP_BASE_URL}/user/sign-up`,
      {
        nickname: nickname,
        userId: userId,
        password: password,
      }
    )
    .then((response) => {
      setCookie("accessToken", response.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      setCookie("refreshToken", response.data.refreshToken, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      alert("성공적으로 회원 가입이 완료되었습니다.");
      return true;
    })
    .catch((error) => {
      alert("알 수 없는 오류가 발생하였습니다.");
      return error.response.status;
    });
