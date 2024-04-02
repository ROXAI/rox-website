"use server";

import { BusinessProfile } from "@/app/ts/types";
import { apiRoutes } from "@/data/routes";
import { apiMutationWithFetch } from "@/helpers/api_mutation";

interface updateBusinessDataInput
  extends Pick<BusinessProfile, "postingStatus"> {}

export const updateBusinessProfile = async (data: updateBusinessDataInput) => {
  const businessProfileUrl = apiRoutes.userBusiness.updateBusinessData;
  const apiServerMutation = apiMutationWithFetch();
  await apiServerMutation(businessProfileUrl, data);
  return "SUCCESS";
};
