import {
  facebookAppConfigNames,
  getFaceBookPageId,
  inspectAcessTokensUrl,
} from "@/config/facebook";
import { getEnv } from "@/utils/getEnv";

export const getPageId = async (accessToken: string, user_id: string) => {
  const { stringifiedPageIdUrl } = getFaceBookPageId(accessToken, user_id);
  const response = await fetch(stringifiedPageIdUrl);
  const { data, error } = await response.json();
  if (!response.ok) throw error;
  return {
    id: data[0].id,
    name: data[0].name,
    access_token: data[0].access_token,
  };
};

export const inspectAccessToken = async (token: string) => {
  const { InspectAcessTokensUrl } = inspectAcessTokensUrl(token);
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
    const response = await inspectAccessToken(data.access_token);

    const _data = await response.json();
    if (!res.ok) throw _data.error;

    return {
      userId: _data.data.user_id,
      accessToken: data.access_token,
      exp: 0,
    };
  } catch (error: any) {
    throw {
      code: error.code,
      message: error.message || "error processing access code",
    };
  }
};
