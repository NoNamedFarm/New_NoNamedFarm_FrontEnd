import axios from "axios";
import { DiaryUpdateRequestType } from "../../../assets/types/diary/update/request";
import { DiaryUpdateResponseType } from "../../../assets/types/diary/update/response";
import * as C from "../../../utils/cookie";
import { userRefresh } from "../../user/refresh";

export const diaryUpdate = async ({
  id,
  date,
  content,
}: DiaryUpdateRequestType): Promise<boolean | number> =>
  await axios
    .put<DiaryUpdateResponseType>(
      `${process.env.REACT_APP_BASE_URL}/diary/${id}`,
      {
        date: date,
        content: content,
      },
      {
        headers: { Authorization: `Bearer ${C.getCookie("accessToken")}` },
      }
    )
    .then(() => {
      alert("성공적으로 일지 수정이 완료되었습니다.");
      return true;
    })
    .catch(async (error) => {
      if (error.response.status === 401)
        if (await userRefresh())
          diaryUpdate({
            id: id,
            date: date,
            content: content,
          });
      return false;
    });
