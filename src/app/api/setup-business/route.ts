import { apiRoutes } from "@/data/routes";
import { apiMutation } from "@/helpers/api_mutation";
import { ErrorType } from "@/app/ts/types";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiServerMutation = apiMutation();
    const uri = apiRoutes.user.setUpBusiness;
    const reqData = await req.json();
    const { data } = await apiServerMutation(uri, reqData);

    return new Response(JSON.stringify({ data: data }));
  } catch (e: any) {
    const _error = e as AxiosError<ErrorType>;
    const error = _error.response?.data.error;
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
