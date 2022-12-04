import axios from "axios";
import * as C from "../../../utils/cookie";

export const userRefresh = async (preventDefault?: boolean): Promise<boolean> =>
  await axios
    .put(
      `${process.env.REACT_APP_BASE_URL}/user/refresh`,
      {},
      {
        headers: {
          "Refresh-Token": `${C.getCookie("refreshToken")}`,
        },
      }
    )
    .then((response) => {
      C.setCookie("accessToken", response.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      C.setCookie("refreshToken", response.data.refreshToken, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      return true;
    })
    .catch(() => {
      if (!preventDefault === true) {
        if (C.getCookie("accessToken")) {
          alert("보안을 위해 로그아웃되었습니다. 다시 로그인해주세요.");
          window.location.replace("/login");
        }
      }
      C.deleteCookie("accessToken");
      return false;
    });
