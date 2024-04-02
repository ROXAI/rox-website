import Image from "next/image";
import styles from "./setup-card.module.scss";
import { ReactNode } from "react";

interface SetupCardProps {
  imgUrl: string;
  children: ReactNode;
}

export const SetupCard: React.FC<SetupCardProps> = ({ imgUrl, children }) => {
  return (
    <div className={styles["Container"]}>
      <Image
        src={imgUrl}
        alt="connect icon"
        width={100}
        height={100}
        className={styles["Icon-container"]}
      />
      <div className={styles["Container-btn"]}>{children}</div>
    </div>
  );
};
