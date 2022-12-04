import axios from "axios";
import { FarmDeleteRequestType } from "../../../assets/types/farm/delete/request";
import * as C from "../../../utils/cookie";
import { userRefresh } from "../../user/refresh";

export const farmDelete = async ({
  farmId,
}: FarmDeleteRequestType): Promise<boolean> =>
  await axios
    .delete(`${process.env.REACT_APP_BASE_URL}/farm/${farmId}`, {
      headers: { Authorization: `Bearer ${C.getCookie("accessToken")}` },
    })
    .then(() => {
      alert("성공적으로 농장 삭제가 완료되었습니다.");
      return true;
    })
    .catch(async (error) => {
      if (error.response.status === 401)
        if (await userRefresh())
          farmDelete({
            farmId: farmId,
          });
      return false;
    });
