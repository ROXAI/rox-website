import axios from "axios";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

const AppId = process.env.FB_CLIENT_ID;
const AppSecret = process.env.FB_CLIENT_SECRET;
export const GET = async (req: NextRequest) => {
  const loginCode = new URL(req.url).searchParams.get("loginCode");
  
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
    

    await axios("http://localhost:4000/api/v1/facebook/auth/store-user-auth-details", {
      method: "post",
      data: { userId: _data.data.user_id, accessToken: data.access_token },
      headers: {
        "Content-Type": "application/json",
      },
    });

    cookies().set({
      name: "FB-USER-ID",
      value: _data.data.user_id,
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    cookies().set({
      name: "FB-ACCESS-TOKEN",
      value: data.access_token,
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    return Response.json({ data }, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.response.data.error }, { status: 500 });
  }
};
