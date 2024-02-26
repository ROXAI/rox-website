import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { apiMutation } from "../../../../helpers/api_mutation";
import { apiRoutes } from "@/data/routes";
import { Error } from "@/app/ts/types";
import { Auth } from "@/app/ts/types/enums";
import { AxiosError } from "axios";
import { apiQuery } from "@/helpers/api_query";

export async function GET(req: NextRequest, res: NextResponse) {
  const user_id = new URLSearchParams(req.url).get("uid");
  console.log("====================================");
  console.log(req.url);
  console.log("====================================");
  try {
    const cookie = cookies();
    const uri = `${apiRoutes.user.refreshtoken}?uid=${user_id}`;
    const apiQueryData = apiQuery();
    const { data } = await apiQueryData(uri);
    const newToken = data.data as { accessToken: string };
    cookie.set("Auth.token", newToken.accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
    });

    return new Response(JSON.stringify({ data: newToken }));
  } catch (e: any) {
    const _error = e as AxiosError<Error>;
    const error = _error.response?.data.error;
    console.log("===================", _error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
