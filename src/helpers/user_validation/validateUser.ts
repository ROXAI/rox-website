import { Auth } from "@/app/ts/types/enums";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { apiQuery } from "../api_query";
import { apiRoutes } from "@/data/routes";
import { serverErrorLogger } from "../logger";

export class validateUser {
  isTokenExpired = () => {
    const cookie = cookies();
    const accessToken = cookie.get(Auth.token);

    if (!accessToken?.value) return false;

    const decodedToken = jwtDecode(accessToken?.value);
    if (decodedToken && typeof decodedToken.exp === "number") {
      const tokenExpirationTime = decodedToken.exp * 1000;
      return tokenExpirationTime <= Date.now();
    }
    return false;
  };

  IsEmailVerified = () => {
    const cookie = cookies();
    const accessToken = cookie.get(Auth.token);
    if (accessToken?.value) return accessToken.value;
    else return accessToken?.value;
  };

  refreshtoken = async () => {
    const cookie = cookies();
    const accessToken = cookie.get(Auth.token);

    const decodedToken = jwtDecode<{ user_id: string }>(accessToken?.value!);
    const apiQueryData = apiQuery();
    const uri = `${apiRoutes.user.refreshtoken}?uid=${decodedToken.user_id}`;
    const res = await apiQueryData(uri);
    const data = await res.json();
    if (!res.ok) serverErrorLogger("REFRESH_TOKEN_ERROR", data?.error?.message);

    return data.data as { accessToken: string };
  };

  isUserAuthenticated = async () => {
    if (this.isTokenExpired()) {
      const token = await this.refreshtoken();
      return token.accessToken;
    }
    return false;
  };
}
