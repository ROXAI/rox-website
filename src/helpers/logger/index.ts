import { ErrorType } from "@/app/ts/types";
import { AxiosError } from "axios";

export const logger = (error: AxiosError<ErrorType>) => {
  const errorMessage = error.response?.data.error;
  console.error(error.response?.data);
};

type serverErrorType = "REFRESH_TOKEN_ERROR" | "PROFILE_ERROR"|"PRODUCT_FETCH"| "SERVICE_FETCH";
export const serverErrorLogger = (type: serverErrorType, message: string) => {
  const errorData = {
    code: type,
    message,
  };
  console.error(errorData);
  throw new Error(errorData.message);
};

export const apiHandlerLogger = (e: any) => {
  const _error = e as AxiosError<ErrorType>;
  const error = _error.response?.data.error;
  return new Response(JSON.stringify({ error: error }), {
    status: 500,
  });
};
