import axios from "axios";
import { userStateAtomType } from "../../../atoms/userState";
import * as C from "../../../utils/cookie";
import { userRefresh } from "../refresh";

export const userLoad = async (): Promise<userStateAtomType | boolean | any> =>
  await axios
    .get<userStateAtomType>(`${process.env.REACT_APP_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${C.getCookie("accessToken")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch(async () => {
      if (await userRefresh(true)) return userLoad();
      return false;
    });
