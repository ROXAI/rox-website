"use client";
import Link from "next/link";
import { Button } from "../components/atom/CTA";
import { GoogleAuth } from "../components/atom/google";
import { InputField } from "../components/molecules/inputField";
import styles from "./login.module.css";
import { EmailLogin } from "../components/atom/emailLogin";
import { ChangeEvent, useState } from "react";
import { AlertComponent } from "../components/atom/alert";
import { logger } from "@/helpers/logger";
import { useAlertHook } from "../hooks/alertHook";
import { useAuthDataState } from "../state-management/context";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { ErrorType } from "@/app/ts/types";

export default function Login() {
  const [_, setAuthData] = useAuthDataState();
  const { error, isDisabled, setIsDisabled, setError } = useAlertHook();
  const [loginData, setLoginData] = useState({
    password: "",
    email: "",
  });

  const { push } = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  };

  const loginHandler = async () => {
    setError("");
    setIsDisabled(true);
    try {
      const uri = "/api/auth/login";
      const { data } = await axios.post(uri, loginData);
      setAuthData(data);
      push("/dashboard");
    } catch (e: any) {
      setIsDisabled(false);
      const error = e as AxiosError<ErrorType>;
      setError(error?.response?.data?.error?.message || "something went wrong");
      logger(error);
    }
  };

  return (
    <main>
      <div className={styles["LoginFormContainer"]}>
        <div className={styles["LoginForm-wrapper"]}>
          <span>
            Not Registered?{" "}
            <Link className={styles["Navigate"]} href="/sign-up">
              Create An Account {">"}
            </Link>
          </span>

          <GoogleAuth text="Login with google" />
          <EmailLogin text="Or login with Email" />

          <InputField
            label="Email"
            value={loginData.email}
            name="email"
            onChange={handleChange}
          />

          <InputField
            label="Password"
            value={loginData.password}
            name="password"
            type="password"
            onChange={handleChange}
          />

          <div className={styles["loginAlertWrapper"]}>
            <Button
              handler={loginHandler}
              size="small"
              text="login"
              type="button"
              disabled={isDisabled}
            />

            {error && <AlertComponent errorMessage={error} />}
          </div>
        </div>
      </div>
    </main>
  );
}
