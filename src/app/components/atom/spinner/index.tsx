"use client";
import { Spinner } from "keep-react";
import styles from "./spinner.module.css";
import { useLoadSpinnerState } from "@/app/state-management/helper-state";

type SpinnerComponentProps = {
  size?: "lg" | "sm";
};
export const SpinnerComponent: React.FC<SpinnerComponentProps> = ({
  size = "lg",
}) => {
  return <Spinner color="info" size={size} />;
};

export const SpinnerLoader = () => {
  const [loadSpinner] = useLoadSpinnerState();
  if (!loadSpinner) return <></>;
  return (
    <div className={styles["Container"]}>
      <SpinnerComponent />;
    </div>
  );
};
