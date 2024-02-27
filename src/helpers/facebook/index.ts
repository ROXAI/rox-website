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

export const getMetaUserAuthData = async (
  loginCode: string,
  redirect_uri: string
) => {
  const AppId = getEnv(facebookAppConfigNames.APP_ID);
  const AppSecret = getEnv(facebookAppConfigNames.APP_SECRET);
  try {
    const params = {
      client_id: AppId,
      client_secret: AppSecret,
      redirect_uri: `http://localhost:3000/${redirect_uri}`,
      code: loginCode,
    };
    const encoded = new URLSearchParams(params);
    const res = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?${encoded.toString()}`
    );
    const data = await res.json();
    if (!res.ok) throw data.error;
    const debug_token_params = {
      input_token: data.access_token,
      access_token: data.access_token,
    };

    const encodedParams = new URLSearchParams(debug_token_params);
    const response = await fetch(
      `https://graph.facebook.com/debug_token?${encodedParams.toString()}`
    );

    const _data = await response.json();
    if (!res.ok) throw _data.error;
    return {
      userId: _data.data.user_id,
      accessToken: data.access_token,
      exp: data.expires_in,
    };
  } catch (error: any) {
    throw {
      code: error.code,
      message: error.message || "error processing access code",
    };
  }
};
