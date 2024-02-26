import axios from "../../helpers/axios";
import { getToken } from "../Actions";

export const useApiMutation = (method: "put" | "post" = "post") => {
  return async (url: string, data: any, token?: string) => {
    const _token = await getToken();
    return await axios(url, {
      method: method,
      data: data,
      headers: {
        Authorization: _token || token,
      },
    });
  };
};
