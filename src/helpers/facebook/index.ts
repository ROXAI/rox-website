import {
  facebookAppConfigNames,
  getFaceBookPageId,
  inspectAcessTokensUrl,
} from "@/config/facebook";
import { getEnv } from "@/utils/getEnv";
import axios from "axios";

export const getPageId = async (accessToken: string, user_id: string) => {
  const { stringifiedPageIdUrl } = getFaceBookPageId(accessToken, user_id);
  return await fetch(stringifiedPageIdUrl);
};

export const inspectAccessToken = async (token: string, appToken: string) => {
  const { InspectAcessTokensUrl } = inspectAcessTokensUrl(token, appToken);
  return await fetch(InspectAcessTokensUrl);
};

export const getMetaUserAuthData = async (loginCode: string) => {
  const AppId = getEnv(facebookAppConfigNames.APP_ID);
  const AppSecret = getEnv(facebookAppConfigNames.APP_SECRET);
  try {
    const { data } = await axios({
      url: "https://graph.facebook.com/v18.0/oauth/access_token",
      method: "get",
      params: {
        client_id: AppId,
        client_secret: AppSecret,
        redirect_uri: "http://localhost:3000/",
        code: loginCode,
      },
    });

    const { data: _data } = await axios(
      "https://graph.facebook.com/debug_token",
      {
        method: "get",
        params: {
          input_token: data.access_token,
          access_token: data.access_token,
        },
      }
    );

    return { userId: _data.data.user_id, accessToken: data.access_token };
  } catch (error: any) {
    throw {
      code: error.code,
      message: error.message || "error processing access code",
    };
    // return {userId:"", accessToken:""}
  }
};
