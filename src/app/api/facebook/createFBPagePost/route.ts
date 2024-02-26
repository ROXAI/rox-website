import { FacebookPage } from "@/helpers/facebook/FB-page";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const _data = await req.json();
    const { createPost } = new FacebookPage();
    const { data } = await createPost(_data);
    return Response.json({ data }, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.response.data.error }, { status: 500 });
  }
};
