"use client";
import { useSideBarVisibility } from "@/app/state-management/helper-state";
import { Sidebar } from "../../sidebar";
import styles from "./mobile-sidbar.module.scss";

export const SideBarForMobileView = () => {
  const [showSideBar] = useSideBarVisibility();
  // if (showSideBar)
    return (
      <div className={styles["Container"]}>
        <Sidebar />
      </div>
    );

  return <></>;
};
