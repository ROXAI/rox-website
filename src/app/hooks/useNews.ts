import { useAuthDataValue } from "../state-management/context";
export const useNews = () => {
    const authuser = useAuthDataValue()
  return (update = "") => {
    if (!authuser?.email_verified)
      return "Dear user check your inbox and verify your email";

    return update;
  };
};
