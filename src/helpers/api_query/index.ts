import { Auth } from "@/app/ts/types/enums";
import { cookies } from "next/headers";
import { getEnv } from "@/utils/getEnv";
export const apiQuery = (method: "get" | "option" = "get", config?: any) => {
  const cookie = cookies();
  const accessToken = cookie.get(Auth.token);
  return async (url: string, token = "") => {
    return await fetch(`http://localhost:4000/api/v1${url}`, {
      method: method,
      headers: {
        Authorization: token || accessToken?.value,
      },
      ...config,
    });
  };
};

export const apiServerQuery = (
  method: "get" | "option" = "get",
  config?: any
) => {
  const cookie = cookies();
  const accessToken = cookie.get(Auth.token);
  return async (url: string, token = "") => {
    const baseURL = getEnv("NEXT_PUBLIC_BASE_SERVER_URL");
    const res = await fetch(`${baseURL}${url}`, {
      method: method,
      headers: {
        Authorization: token || accessToken?.value,
      },
      ...config,
    });
    const response = await res.json();
    if (!res.ok) throw response;
    return response;
  };
};
