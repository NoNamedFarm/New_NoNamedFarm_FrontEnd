import axios from "axios";
import { FarmCreateRequestType } from "../../../assets/types/farm/create/request";
import { FarmCreateResponseType } from "../../../assets/types/farm/create/response";
import * as C from "../../../utils/cookie";
import { userRefresh } from "../../user/refresh";

export const farmCreate = async ({
  deviceId,
  farmName,
  farmCrop,
}: FarmCreateRequestType): Promise<boolean | number> =>
  await axios
    .post<FarmCreateResponseType>(
      `${process.env.REACT_APP_BASE_URL}/farm`,
      {
        deviceId: deviceId,
        farmName: farmName,
        farmCrop: farmCrop,
      },
      {
        headers: { Authorization: `Bearer ${C.getCookie("accessToken")}` },
      }
    )
    .then(() => {
      alert("성공적으로 농장 생성이 완료되었습니다.");
      return true;
    })
    .catch(async (error) => {
      if (error.response.status === 401)
        if (await userRefresh())
          farmCreate({
            deviceId: deviceId,
            farmName: farmName,
            farmCrop: farmCrop,
          });
      return error.response.status;
    });
