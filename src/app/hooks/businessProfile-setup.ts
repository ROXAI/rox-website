import { ChangeEvent, FormEvent, useState } from "react";
import { useAlertHook } from "./alertHook";
import axios, { AxiosError } from "axios";
import { ErrorType, businessInfoData } from "@/app/ts/types";
import { logger } from "@/helpers/logger";
import { apiRoutes } from "@/data/routes";
import { useRouter } from "next/navigation";
import {
  useActionState,
  useBusinessProfileState,
} from "../state-management/helper-state";
import { userBusinessInfoState } from "../state-management/context";

export const useBusinessProfileSetup = () => {
  const { push } = useRouter();
  const [{ businessFormAction }, setCloseProductForm] = useActionState();
  const [_, setBusinessInfo] = userBusinessInfoState();
  const [businessProfileData, setBusinessProfileData] =
    useBusinessProfileState();

  const { error, isDisabled, setIsDisabled, setError } = useAlertHook();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBusinessProfileData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  function validateObjectFields(object: any) {
    for (const key in object) {
      if (!object[key]) {
        return false;
      }
    }
    return true;
  }

  const createBusinessInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const data = JSON.parse(JSON.stringify(businessProfileData));
    if (businessProfileData?._id.length === 0) delete data._id;
    if (!validateObjectFields(data)) {
      setError("one or more field is empty");
      return;
    }
    setIsDisabled(true);
    try {
      const uri = apiRoutes.routeHandler.setUpBusiness;
      await axios.post(uri, { ...data });
      push("/dashboard");
      setIsDisabled(false);
    } catch (e: any) {
      setIsDisabled(false);
      const error = e as AxiosError<ErrorType>;
      setError(error?.response?.data?.error?.message || "something went wrong");
      logger(error);
    }
  };

  const closeForm = () => {
    setError("");
    setCloseProductForm((prevState) => {
      return { ...prevState, businessFormAction: !businessFormAction };
    });
  };

  const openBusinessInfoForm = (
    businessInfo: Pick<businessInfoData, "_id" | "businessName" | "description">
  ) => {
    setBusinessProfileData(businessInfo);
    closeForm();
  };

  const updateBusinessInfo = async (e: FormEvent<HTMLFormElement>) => {
    setIsDisabled(true);
    e.preventDefault();
    setError("");
    try {
      const url = apiRoutes.routeHandler.updateBusinessData;
      const { data } = await axios.post(url, businessProfileData);
      if (data?.data)
        setBusinessInfo((prevState) => ({
          ...prevState,
          currentSelection: data?.data,
        }));
      setIsDisabled(false);
      closeForm();
    } catch (e: any) {
      setIsDisabled(false);
      const error = e as AxiosError<ErrorType>;
      setError(error?.response?.data?.error?.message || "something went wrong");
      logger(error);
    }
  };

  return {
    businessProfileData,
    error,
    isDisabled,
    handleChange,
    closeForm,
    openBusinessInfoForm,
    updateBusinessInfo,
    createBusinessInfo,
    formStatus: businessFormAction,
  };
};
