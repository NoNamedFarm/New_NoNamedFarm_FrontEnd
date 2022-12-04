import axios from "axios";
import * as C from "../../../utils/cookie";

export const userLogout = async () =>
  await axios
    .delete(`${process.env.REACT_APP_BASE_URL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${C.getCookie("accessToken")}`,
      },
    })
    .finally(() => {
      C.deleteCookie("accessToken");
    });
