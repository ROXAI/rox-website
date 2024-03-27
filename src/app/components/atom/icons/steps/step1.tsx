import styles from "./steps.module.css";

import { RiFileList3Fill } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { LiaFlagCheckeredSolid } from "react-icons/lia";

interface IconStepProps {
  iconName: "list" | "accounts" | "final";
  step?: boolean;
}

export const InconStep1: React.FC<IconStepProps> = ({ iconName, step }) => {
  const icons = {
    list: <RiFileList3Fill className={styles["Icon"]} />,
    accounts: <IoIosPeople className={styles["Icon"]} />,
    final: <LiaFlagCheckeredSolid className={styles["Icon"]} />,
  };
  return (
    <span
      className={`${styles[`Container`]} ${
        step ? styles[`step-conpleted`] : ""
      }`}
    >
      {icons[iconName]}
    </span>
  );
};
