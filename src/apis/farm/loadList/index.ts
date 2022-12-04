import axios from "axios";
import { FarmLoadListRequestType } from "../../../assets/types/farm/loadList/request";
import { FarmLoadListResponseType } from "../../../assets/types/farm/loadList/response";
import * as C from "../../../utils/cookie";
import { userRefresh } from "../../user/refresh";

export const farmLoadList = async ({
  page,
  size,
}: FarmLoadListRequestType): Promise<FarmLoadListResponseType | boolean> =>
  await axios
    .get<FarmLoadListResponseType>(`${process.env.REACT_APP_BASE_URL}/farm`, {
      params: {
        page: page,
        size: size,
      },
      headers: { Authorization: `Bearer ${C.getCookie("accessToken")}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch(async (error) => {
      if (error.response.status === 401)
        if (await userRefresh())
          farmLoadList({
            page: page,
            size: size,
          });
      return false;
    });
