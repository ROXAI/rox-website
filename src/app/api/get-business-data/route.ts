import { apiRoutes } from "@/data/routes";
import { apiServerQuery } from "@/helpers/api_query";
import { ErrorType } from "@/app/ts/types";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiServerQueryInstance = apiServerQuery();
    const uri = apiRoutes.user.getBusinessDataOne;
    const param = new URL(req.url).searchParams;
    const id = param.get("id");
    const data = await apiServerQueryInstance(`${uri}?id=${id}`);
    return new Response(JSON.stringify(data));
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e }), {
      status: 500,
    });
  }
}
