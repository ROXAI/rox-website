"use server";

//module imports
import { facebookAppConfigNames } from "@/config/facebook";
import { getEnv } from "@/utils/getEnv";

//dependency imports
import queryString from "query-string";
import { redirect } from "next/navigation";

const loginUrl = (redirectUrl = "") => {
  const appId = getEnv(facebookAppConfigNames.APP_ID);

  const accessScope = ["instagram_basic", "instagram_content_publish"];

  const urlParams = queryString.stringify({
    client_id: appId,
    scope: accessScope,
    response_type: "code",
    redirect_uri: `http://localhost:3000/${redirectUrl}`,
  });

  return `https://www.facebook.com/v18.0/dialog/oauth?${urlParams}`;
};

export const FB_BusinessLogin = () => redirect(loginUrl());
export const IG_BusinessLogin = () => redirect(loginUrl("social-accounts/instagram"));
