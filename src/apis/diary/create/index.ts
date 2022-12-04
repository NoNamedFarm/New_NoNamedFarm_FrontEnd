import axios from "axios";
import { DiaryCreateRequestType } from "../../../assets/types/diary/create/request";
import { DiaryCreateResponseType } from "../../../assets/types/diary/create/response";
import * as C from "../../../utils/cookie";
import { userRefresh } from "../../user/refresh";

export const diaryCreate = async ({
  date,
  content,
}: DiaryCreateRequestType): Promise<boolean> =>
  await axios
    .post<DiaryCreateResponseType>(
      `${process.env.REACT_APP_BASE_URL}/diary`,
      {
        date: date,
        content: content,
      },
      {
        headers: { Authorization: `Bearer ${C.getCookie("accessToken")}` },
      }
    )
    .then(() => {
      alert("성공적으로 일지 저장이 완료되었습니다.");
      return true;
    })
    .catch(async (error) => {
      if (error.response.status === 401)
        if (await userRefresh())
          diaryCreate({
            date: date,
            content: content,
          });
      return false;
    });
