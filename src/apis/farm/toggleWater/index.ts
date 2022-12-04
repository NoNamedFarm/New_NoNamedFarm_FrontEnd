import axios from "axios";
import { FarmSwitchRequestType } from "../../../assets/types/farm/switch/request";
import * as C from "../../../utils/cookie";
import { userRefresh } from "../../user/refresh";

export const farmToggleWater = async ({
  farmId,
}: FarmSwitchRequestType): Promise<boolean> =>
  await axios
    .get(`${process.env.REACT_APP_BASE_URL}/farm/switch/water/${farmId}`, {
      headers: { Authorization: `Bearer ${C.getCookie("accessToken")}` },
    })
    .then(() => {
      return true;
    })
    .catch(async (error) => {
      if (error.response.status === 401)
        if (await userRefresh())
          farmToggleWater({
            farmId: farmId,
          });
      return false;
    });
