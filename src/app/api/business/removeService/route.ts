import { ApplicationIdKeys } from "@/app/ts/enums";
import { apiRoutes } from "@/data/routes";
import { apiMutation } from "@/helpers/api_mutation";
import { apiHandlerLogger } from "@/helpers/logger";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, res: NextResponse) {
  const id = new URL(req.url).searchParams.get(ApplicationIdKeys.SERVICE_ID);

  try {
    const mutation = apiMutation("delete");
    const uri = `${apiRoutes.userBusiness.removeService}?${ApplicationIdKeys.SERVICE_ID}=${id}`;
    const { data } = await mutation(uri, {});
    return new Response(JSON.stringify(data));
  } catch (e: any) {
    return apiHandlerLogger(e);
  }
}
