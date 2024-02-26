import { logger } from "@/helpers/logger";
import { ErrorType } from "@/app/ts/types";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useState } from "react";

interface AlertProps {
  error: string;
  isDisabled: boolean;
  setError: Dispatch<SetStateAction<string>>;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
  clientErrorHandler: (e: any) => void;
}
export const useAlertHook = (): AlertProps => {
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const clientErrorHandler = (e: any): void => {
    const error = e as AxiosError<ErrorType>;
    setError(error?.response?.data?.error?.message || "something went wrong");
    logger(error);
  };
  return {
    error,
    isDisabled,
    setError,
    setIsDisabled,
    clientErrorHandler,
  };
};
