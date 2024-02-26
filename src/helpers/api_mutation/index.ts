import { cookies } from "next/headers";
import axios from "../axios";
import { Auth } from "@/app/ts/types/enums";
import { getEnv } from "@/utils/getEnv";

export const apiMutation = (method: "put" | "post" | "delete" = "post") => {
  const cookie = cookies();
  const accessToken = cookie.get(Auth.token);
  return async (url: string, data: any, token?: string) => {
    return await axios(url, {
      method: method,
      data: data || "",
      headers: {
        Authorization: token || accessToken?.value,
      },
    });
  };
};

export const apiMutationWithFetch = (
  method: "put" | "post" | "delete" = "post"
) => {
  const cookie = cookies();
  const accessToken = cookie.get(Auth.token);
  const baseURL = getEnv("NEXT_PUBLIC_BASE_SERVER_URL");
  return async (url: string, data: any, token?: string) => {
    const res = await fetch(`${baseURL}${url}`, {
      method: method,
      headers: {
        Authorization: `${token || accessToken?.value}`,
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (!res.ok) throw response;
    return response;
  };
};
