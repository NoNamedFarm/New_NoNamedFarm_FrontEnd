import axios from "axios";

export const userCheck = async (userId: string): Promise<boolean | string> =>
  await axios
    .get(`${process.env.REACT_APP_BASE_URL}/user/check`, {
      params: { user: userId },
    })
    .then(() => {
      return true;
    })
    .catch((error) => {
      let errorMessage: string;
      if (error.response.status === 409)
        errorMessage = "이미 사용중인 아이디입니다.";
      else {
        errorMessage = error.response.message;
      }
      return errorMessage;
    });
