import axios from "axios";
import { DiaryLoadListRequestType } from "../../../assets/types/diary/loadList/request";
import { DiaryLoadListResponseType } from "../../../assets/types/diary/loadList/response";
import * as C from "../../../utils/cookie";
import { userRefresh } from "../../user/refresh";

export const diaryLoadList = async ({
  page,
  size,
}: DiaryLoadListRequestType): Promise<
  DiaryLoadListResponseType | number | any
> =>
  await axios
    .get<DiaryLoadListResponseType>(`${process.env.REACT_APP_BASE_URL}/diary`, {
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
          diaryLoadList({
            page: page,
            size: size,
          });
      return false;
    });
