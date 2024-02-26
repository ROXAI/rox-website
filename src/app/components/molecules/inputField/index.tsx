import { Input, TextArea } from "../../atom/input";
import { InputLabel } from "../../atom/inputLable";

import styles from "./input-field.module.css";
import { ChangeEvent, KeyboardEvent } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  type?: "text" | "password";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  type,
  onChange,
  onKeyDown,
}) => {
  return (
    <div className={styles["Container"]}>
      <InputLabel text={label} />
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <div className={styles["Container"]}>
      <InputLabel text={label} />
      <TextArea name={name} value={value} onChange={onChange} />
    </div>
  );
};
