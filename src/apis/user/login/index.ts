import axios from "axios";
import { LoginRequestType } from "../../../assets/types/user/login/request";
import { LoginResponseType } from "../../../assets/types/user/login/response";
import { setCookie } from "../../../utils/cookie";

export const userLogin = async ({
  userId,
  password,
}: LoginRequestType): Promise<boolean | number> =>
  await axios
    .post<LoginResponseType>(`${process.env.REACT_APP_BASE_URL}/user/login`, {
      userId: userId,
      password: password,
    })
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
      alert("성공적으로 로그인이 완료되었습니다.");
      return true;
    })
    .catch((error) => {
      return error.response.status;
    });
