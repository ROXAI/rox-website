import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export const useFacebookLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const loginCode = searchParams.get("code");
  const LoginFaceBook = async () => {
    setLoading(true);
    try {
      const { data } = await axios(`api/facebook/Login?loginCode=${loginCode}`);
      push("/home");
    } catch (error: any) {
      console.error(error.response.data.error);
    }
  };
  useEffect(() => {
    if (loginCode) LoginFaceBook();
  }, []);
  return { loading, errMessage };
};
