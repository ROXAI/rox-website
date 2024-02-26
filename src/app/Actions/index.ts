"use server";

import { apiRoutes } from "@/data/routes";
import { apiMutation } from "@/helpers/api_mutation";
import { ContentType } from "../ts/interface";
import { cookies } from "next/headers";
import { Auth } from "../ts/types/enums";

interface generateAdContentData extends ContentType {
  businessId: string;
}
export const generateAdContent = async (data: generateAdContentData) => {
  const url = apiRoutes.adContent.generateAdContent;
  const apiServerMutation = apiMutation();
  return await apiServerMutation(url, data);
};

export const getToken = async () => {
  const cookie = cookies();
  const accessToken = cookie.get(Auth.token);
  return accessToken?.value || "";
};
