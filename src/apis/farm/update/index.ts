import axios from "axios";
import { FarmCreateResponseType } from "../../../assets/types/farm/create/response";
import { FarmUpdateRequestType } from "../../../assets/types/farm/update/request";
import * as C from "../../../utils/cookie";
import { userRefresh } from "../../user/refresh";

export const farmUpdate = async ({
  farmId,
  farmName,
  farmCrop,
}: FarmUpdateRequestType): Promise<boolean> =>
  await axios
    .put<FarmCreateResponseType>(
      `${process.env.REACT_APP_BASE_URL}/farm/${farmId}`,
      {
        farmName: farmName,
        farmCrop: farmCrop,
      },
      {
        headers: { Authorization: `Bearer ${C.getCookie("accessToken")}` },
      }
    )
    .then(() => {
      alert("성공적으로 농장 수정이 완료되었습니다.");
      return true;
    })
    .catch(async (error) => {
      if (error.response.status === 401)
        if (await userRefresh())
          farmUpdate({
            farmId: farmId,
            farmName: farmName,
            farmCrop: farmCrop,
          });
      return false;
    });
