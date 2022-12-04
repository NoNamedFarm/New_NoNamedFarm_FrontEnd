import axios from "axios";
import { DiaryDeleteRequestType } from "../../../assets/types/diary/delete/request";
import * as C from "../../../utils/cookie";
import { userRefresh } from "../../user/refresh";

export const diaryDelete = async ({
  id,
}: DiaryDeleteRequestType): Promise<boolean | number> =>
  await axios
    .delete(`${process.env.REACT_APP_BASE_URL}/diary/${id}`, {
      headers: { Authorization: `Bearer ${C.getCookie("accessToken")}` },
    })
    .then(() => {
      alert("성공적으로 일지 삭제가 완료되었습니다.");
      return true;
    })
    .catch(async (error) => {
      if (error.response.status === 401)
        if (await userRefresh())
          diaryDelete({
            id: id,
          });
      return error.response.status;
    });
