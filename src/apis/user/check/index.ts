import axios from "axios";

export const userCheck = async (userId: string): Promise<boolean | number> =>
  await axios
    .get(`${process.env.REACT_APP_BASE_URL}/user/check`, {
      params: { user: userId },
    })
    .then(() => {
      return true;
    })
    .catch((error) => {
      return error.response.status;
    });
