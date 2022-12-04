import axios from "axios";
import { DiaryLoadRequestType } from "../../../assets/types/diary/load/request";
import { DiaryLoadResponseType } from "../../../assets/types/diary/load/response";
import * as C from "../../../utils/cookie";
import { userRefresh } from "../../user/refresh";

export const diaryLoad = async ({
  diaryId,
}: DiaryLoadRequestType): Promise<DiaryLoadResponseType | boolean> =>
  await axios
    .get<DiaryLoadResponseType>(
      `${process.env.REACT_APP_BASE_URL}/diary/${diaryId}`,
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
          return diaryLoad({
            diaryId: diaryId,
          });
      return false;
    });
