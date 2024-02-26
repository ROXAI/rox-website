import { ApplicationIdKeys } from "@/app/ts/enums";
import { apiRoutes } from "@/data/routes";
import { apiServerQuery } from "@/helpers/api_query";
import { apiHandlerLogger } from "@/helpers/logger";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const businessId = new URL(req.url).searchParams.get(
      ApplicationIdKeys.BUSINESS_ID
    );
    const query = apiServerQuery();
    const uri = apiRoutes.userBusiness.getProducts;
    const  data  = await query(
      `${uri}?${ApplicationIdKeys.BUSINESS_ID}=${businessId}`
    );
    return new Response(JSON.stringify(data));
  } catch (e: any) {
    return apiHandlerLogger(e);
  }
}
