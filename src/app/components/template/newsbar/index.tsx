"use client";
import { useNews } from "@/app/hooks/useNews";
import styles from "./newsbar.module.css";
import { PlatformName } from "../../atom/plateformName";

interface NewsBarProps {
  userEmail: string;
}

export const NewsBar:React.FC<NewsBarProps> = ({userEmail}) => {
  const newsInstance = useNews();
  const news = newsInstance();

  return (
    <div className={styles["Container"]}>
        <PlatformName />
      <div className={styles["Avater-Container"]}>
        <span>{userEmail}</span>
        <div className={styles["Avater"]}></div>
      </div>
    </div>
  );
};
