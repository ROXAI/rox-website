import { ReactNode } from "react";
import styles from "./styles/cta.module.css";
import sasStyles from "./styles/button.module.scss";

interface ButtonProps {
  text: string;
  size?: "small" | "medium";
  type: "submit" | "button";
  disabled?: boolean;
  handler?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  type,
  size,
  disabled,
  handler,
}) => {
  const BtnSize = size === "medium" ? 10 : size === "small" ? 7 : 7;
  const classes = disabled
    ? `${sasStyles["Btn"]} ${sasStyles["Btn-disabled"]}`
    : sasStyles["Btn"];
  return (
    <button
      style={{ width: `${BtnSize}rem` }}
      className={classes}
      type={type}
      onClick={handler}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export const AddBtn: React.FC<ButtonProps> = ({ handler, type, text }) => {
  return (
    <button onClick={handler} className={styles["Add"]} type={type}>
      {text}
    </button>
  );
};

interface CtaProps {
  children: ReactNode;
  size?: "small" | "medium";
  type: "submit" | "button";
  disabled?: boolean;
  handler?: () => void;
}
export const CTA: React.FC<CtaProps> = ({ children, handler }) => {
  return (
    <div>
      <button className={styles["MainCta"]} onClick={handler}>
        {children}
      </button>
    </div>
  );
};
