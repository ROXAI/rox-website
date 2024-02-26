import { ChangeEvent, KeyboardEvent } from "react";
import styles from "./input.module.css";

interface InputProps {
  name: string;
  value: string;
  type?: "text" | "password";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}
export const Input: React.FC<InputProps> = ({
  name,
  value,
  type,
  onChange,
  onKeyDown,
}) => {
  return (
    <input
      className={styles["Input"]}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

interface TextAreaProps {
  name: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
export const TextArea: React.FC<TextAreaProps> = ({
  name,
  value,
  onChange,
}) => {
  return (
    <textarea
      className={styles["Input"]}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};
