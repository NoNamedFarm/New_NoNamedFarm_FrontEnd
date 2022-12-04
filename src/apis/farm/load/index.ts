import axios from "axios";
import { FarmLoadRequestType } from "../../../assets/types/farm/load/request";
import { FarmLoadResponseType } from "../../../assets/types/farm/load/response";
import * as C from "../../../utils/cookie";
import { userRefresh } from "../../user/refresh";

export const farmLoad = async ({
  farmId,
}: FarmLoadRequestType): Promise<FarmLoadResponseType | boolean> =>
  await axios
    .get<FarmLoadResponseType>(
      `${process.env.REACT_APP_BASE_URL}/farm/${farmId}`,
      {
        headers: { Authorization: `Bearer ${C.getCookie("accessToken")}` },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch(async (error) => {
      if (error.response.status === 401)
        if (await userRefresh())
          farmLoad({
            farmId: farmId,
          });
      return false;
    });
