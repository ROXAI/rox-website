import { getEnv } from "@/utils/getEnv";
import queryString from "query-string";

export enum facebookAppConfigNames {
  APP_ID = "TEST_FB_APP_ID",
  APP_SECRET = "TEST_FB_APP_SECRET",
  LOGIN_CONFIG_ID = "LOGIN_CONFIG_ID",
}

export const getFaceBookPageId = (
  user_access_token: string,
  user_id: string
) => {
  return {
    stringifiedPageIdUrl: `https://graph.facebook.com/v18.0/${user_id}/accounts?access_token=${user_access_token}`,
  };
};

export const inspectAcessTokensUrl = (token: string) => {
  const AppId = getEnv(facebookAppConfigNames.APP_ID);
  const AppSecret = getEnv(facebookAppConfigNames.APP_SECRET);
  const stringifiedParams = queryString.stringify({
    input_token: token,
    access_token: `${AppId}|${AppSecret}`,
  });
  return {
    InspectAcessTokensUrl: `https://graph.facebook.com/debug_token?${stringifiedParams}`,
  };
};

export const FBAccessTokenCookieKey = "FB-ACCESS-TOKEN";
export const FBUserIdCookieKey = "FB-USER-ID";
