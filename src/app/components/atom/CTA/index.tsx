import styles from "./cta.module.css";

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
    ? `${styles["Btn"]} ${styles["Btn-disabled"]}`
    : styles["Btn"];
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

export const MainButton: React.FC<ButtonProps> = ({
  text,
  type,
  size,
  disabled,
  handler,
}) => {
  const BtnSize = size === "medium" ? 10 : size === "small" ? 7 : 7;
  const classes = disabled
    ? `${styles["MainBtn"]} ${styles["Btn-disabled"]}`
    : styles["MainBtn"];
  
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

import { Button as Btn } from "keep-react";

// export const ButtonComponent: React.FC<ButtonProps> = ({
//   text,
//   type,
//   size,
//   disabled,
//   handler,
// }) => {
//   return (
//     <>
//       <Btn
//         className={styles["Btn-test"]}
//         size="lg"
//         type="primary"
//         pill={true}
//         onClick={handler}
//         disabled={disabled}
//       >
//         Default
//       </Btn>
//     </>
//   );
// };

export const AddBtn: React.FC<ButtonProps> = ({ handler, type, text }) => {
  return (
    <button onClick={handler} className={styles["Add"]} type={type}>
      {text}
    </button>
  );
};
