import { apiRoutes } from "@/data/routes";
import { apiQuery } from "@/helpers/api_query";
import { serverErrorLogger } from "@/helpers/logger";
import { BusinessServices } from ".";

export const getServices = async () => {
  const apiQueryData = apiQuery();
  const servicesUrl = apiRoutes.userBusiness.getServices;
  const service = await apiQueryData(
    `${servicesUrl}`
  );
  const services = await service.json();
  if (!service.ok) serverErrorLogger("SERVICE_FETCH", services.error.message);
  return services;
};

export const ServiceListing = async () => {
  const services = await getServices();
  return <BusinessServices service={services?.data} />;
};
