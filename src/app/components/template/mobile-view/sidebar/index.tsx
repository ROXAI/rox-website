import { Sidebar } from "../../sidebar";
import { UserBusinessInfoTypes } from "@/app/ts/types";
import { apiQuery } from "@/helpers/api_query";
import { apiRoutes } from "@/data/routes";
import { serverErrorLogger } from "@/helpers/logger";

interface BusinessList {
  businessInfoData: UserBusinessInfoTypes;
}

export const getBusinesses = async ():Promise<BusinessList> => {
  const apiQueryData = apiQuery();
  const businessInfoUrl = apiRoutes.user.userBusinessInfo;

  const res = await apiQueryData(businessInfoUrl);
  const businessProfile = await res.json();
  if (!res.ok) serverErrorLogger("PROFILE_ERROR", businessProfile?.error || "");
  return { businessInfoData: businessProfile.data } as BusinessList;
};

export const SideBarForMobileView = async () => {
  try {
    const { businessInfoData } = await getBusinesses();
    return <Sidebar data={businessInfoData} />;
  } catch (error: any) {
    return <Sidebar data={{} as any} />;
  }
};

// minore
