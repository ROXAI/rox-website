import { apiRoutes } from "@/data/routes";
import { apiMutation } from "@/helpers/api_mutation";
import { apiHandlerLogger } from "@/helpers/logger";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const mutation = apiMutation();
    const uri = apiRoutes.userBusiness.addService;
    const { data } = await mutation(uri, { ...body });
    return new Response(JSON.stringify(data));
  } catch (e: any) {
    return apiHandlerLogger(e);
  }
}
