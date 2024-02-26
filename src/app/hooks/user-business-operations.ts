import { apiRoutes } from "@/data/routes";
import { logger } from "@/helpers/logger";
import { ErrorType, businessInfoData } from "@/app/ts/types";
import axios, { AxiosError } from "axios";
import {
  useProductAndServicesState,
  userBusinessInfoState,
} from "../state-management/context";
import { useLoadSpinnerState } from "../state-management/helper-state";
import { ApplicationIdKeys } from "../ts/enums";

export const useBusinessOperations = () => {
  const [_, setBusinessInfo] = userBusinessInfoState();
  const [__, setProductsAndServices] = useProductAndServicesState();
  const [___, setLoadSpinner] = useLoadSpinnerState();
  const retrieveBusinessData = async (_id: string) => {
    try {
      const url = `${apiRoutes.routeHandler.getBusinessData}?id=${_id}`;
      const productsUrl = `${apiRoutes.routeHandler.userBusiness.getProducts}?${ApplicationIdKeys.BUSINESS_ID}=${_id}`;
      const servicesUrl = `${apiRoutes.routeHandler.userBusiness.getServices}?${ApplicationIdKeys.BUSINESS_ID}=${_id}`;
      setLoadSpinner(true);
      const { data } = await axios.get(url);
      const { data: products } = await axios.get(productsUrl);
      const { data: services } = await axios.get(servicesUrl);
      
      setBusinessInfo((prevState) => ({
        ...prevState,
        currentSelection: data?.data,
      }));

      setProductsAndServices((prevState) => {
        return {
          ...prevState,
          products: products?.data || [],
          services: services?.data || [],
        };
      });

      setLoadSpinner(false);
    } catch (e: any) {
      setLoadSpinner(false);
      const _error = e as AxiosError<ErrorType>;
      const error = _error.response?.data.error;
      alert(error?.message);
      logger(e);
    }
  };

  return {
    retrieveBusinessData,
  };
};
