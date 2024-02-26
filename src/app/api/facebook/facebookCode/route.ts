import { redirect } from "next/navigation";
import queryString from "query-string";


const appId = process.env.FB_CLIENT_ID;
const stringifiedParamsCode = queryString.stringify({
  client_id: appId,
  scope: [
    "pages_manage_metadata",
    "email",
    "user_friends",
    "pages_manage_engagement",
    "pages_manage_posts",
    "pages_read_engagement",
    // "pages_read_user_engagement",
    "business_management",
  ].join(","), // comma seperated string
  response_type: "code",
  redirect_uri: "http://localhost:3000/",
});
const facebookLoginCodeUrl = `https://www.facebook.com/v18.0/dialog/oauth?${stringifiedParamsCode}`;

export const GET = async () => {
  redirect(facebookLoginCodeUrl);
};
