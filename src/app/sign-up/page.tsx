"use client";
import styles from "./sign-up.module.css";
import { EmailLogin } from "../components/atom/emailLogin";
import { GoogleAuth } from "../components/atom/google";
import { InputField } from "../components/molecules/inputField";
import { Button } from "../components/atom/CTA";
import { useAuthDataState } from "../state-management/context";
import { useAlertHook } from "../hooks/alertHook";

import Link from "next/link";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { ErrorType } from "@/app/ts/types";
import { AlertComponent } from "../components/atom/alert";
import { logger } from "@/helpers/logger";

export default function SignUp() {
  const [_, setAuthData] = useAuthDataState();
  const { error, isDisabled, setIsDisabled, setError } = useAlertHook();
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    password: "",
    email: "",
  });

  const { push } = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prevState) => ({ ...prevState, [name]: value }));
  };

  const signUpHandler = async () => {
    setError("");
    setIsDisabled(true);

    try {
      const uri = "/api/auth/signup";
      const { data } = await axios.post(uri, signUpData);

      setAuthData(data);
      push("/business-setup");
    } catch (e: any) {
      setIsDisabled(false);
      const error = e as AxiosError<ErrorType>;
      setError(error.response?.data?.error?.message || "something went wrong");
      logger(error);
    }
  };

  return (
    <main>
      <div className={styles["LoginFormContainer"]}>
        <div className={styles["LoginForm-wrapper"]}>
          <span>
            Already Registered?{" "}
            <Link className={styles["Navigate"]} href="/login">
              Login {">"}
            </Link>
          </span>

          <GoogleAuth text="sign-up with google" />
          <EmailLogin text="Or sign-up with Email" />

          <InputField
            label="Name"
            value={signUpData.firstName}
            name="firstName"
            onChange={handleChange}
          />
          <InputField
            label="Email"
            value={signUpData.email}
            name="email"
            onChange={handleChange}
          />
          <InputField
            label="Password"
            value={signUpData.password}
            name="password"
            type="password"
            onChange={handleChange}
          />
          <div className={styles["loginAlertWrapper"]}>
            <Button
              handler={signUpHandler}
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
