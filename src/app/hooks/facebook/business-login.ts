import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
export const useFacebookLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const loginCode = searchParams.get("code");
  const LoginFaceBook = async () => {
    setLoading(true);
    try {
      const res = await fetch(`api/facebook/Login?loginCode=${loginCode}`);
      if (res.ok) return push("/home");
      throw new Error("facebook login failed");
    } catch (error: any) {
      console.error(error?.message);
      setErrMessage(error?.message);
    }
  };
  useEffect(() => {
    if (loginCode) LoginFaceBook();
  }, []);
  return { loading, errMessage };
};
