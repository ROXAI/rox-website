import styles from "./input-lable.module.css";

interface InputLabelProps {
  text: string;
}

export const InputLabel: React.FC<InputLabelProps> = ({ text }) => {
  return <label className={styles["LabelContainer"]}>{text}</label>;
};
