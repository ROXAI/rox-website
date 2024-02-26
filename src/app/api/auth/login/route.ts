import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { apiMutation } from "../../../../helpers/api_mutation";
import { apiRoutes } from "@/data/routes";
import { AuthData, ErrorType } from "@/app/ts/types";
import { Auth } from "@/app/ts/types/enums";
import { AxiosError } from "axios";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const cookie = cookies();
    const body = await req.json();
    const mutation = apiMutation();
    const uri = apiRoutes.user.login;
    const { data } = await mutation(uri, { ...body });
    cookie.set(Auth.token, data?.data?.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
    });

    return new Response(JSON.stringify({ data: data?.data }));
  } catch (e: any) {
    const _error = e as AxiosError<ErrorType>;
    const error = _error.response?.data.error;
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
