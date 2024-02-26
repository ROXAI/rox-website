import { getToken } from "../Actions";

const baseUrl = process.env.NEXT_PUBLIC_BASE_SERVER_URL;
export const useApiQuery = () => {
  return async (url: string, token?: string) => {
    const _token = await getToken();
    return await fetch(`${baseUrl}${url}`, {
      method: "get",
      headers: {
        Authorization: `${_token}`,
      },
    });
  };
};
