import { apiRoutes } from "@/data/routes";
import { apiMutation } from "@/helpers/api_mutation";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqData = await req.json();
    const mutation = apiMutation();
    const uri = apiRoutes.user.updateOneBusinessData;
    const { data } = await mutation(uri, { ...reqData });
    return new Response(JSON.stringify(data));
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e }), {
      status: 500,
    });
  }
}
