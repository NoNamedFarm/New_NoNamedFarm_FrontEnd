import axios from "axios";
import { FarmCycleRequestType } from "../../../assets/types/farm/cycle/request";
import { FarmCycleResponseType } from "../../../assets/types/farm/cycle/response";
import * as C from "../../../utils/cookie";
import { userRefresh } from "../../user/refresh";

export const farmLoadCycle = async ({
  farmId,
  year,
  month,
}: FarmCycleRequestType): Promise<FarmCycleResponseType | boolean> =>
  await axios
    .get<FarmCycleResponseType>(
      `${process.env.REACT_APP_BASE_URL}/farm/cycle/${farmId}`,
      {
        params: {
          year: year,
          month: month,
        },
        headers: { Authorization: `Bearer ${C.getCookie("accessToken")}` },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch(async (error) => {
      if (error.response.status === 401)
        if (await userRefresh())
          return farmLoadCycle({
            farmId: farmId,
            year: year,
            month: month,
          });
      return false;
    });
