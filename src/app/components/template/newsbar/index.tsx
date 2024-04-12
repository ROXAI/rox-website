"use client";
import styles from "./newsbar.module.css";
import { PlatformName } from "../../atom/plateformName";

import { CgMenuGridO } from "react-icons/cg";
import { useSideBarVisibility } from "@/app/state-management/helper-state";

interface NewsBarProps {
  userEmail: string;
}

export const NewsBar: React.FC<NewsBarProps> = ({ userEmail }) => {
  const [showSideBar, setShowSideBar] = useSideBarVisibility();

  const handleSidebar = () => {
    setShowSideBar(!showSideBar);
  };
  
  return (
    <div className={styles["Container"]}>
      <div className={styles["MenuBarWrapper"]}>
        <button className={styles["MenuBar"]} onClick={handleSidebar}>
          <CgMenuGridO size={40} />
        </button>
        <PlatformName />
      </div>

      <div className={styles["Avater-Container"]}>
        <span>{userEmail}</span>
        <div className={styles["Avater"]}></div>
      </div>
    </div>
  );
};
