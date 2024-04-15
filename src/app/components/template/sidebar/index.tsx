"use client";
import { useSideBarVisibility } from "@/app/state-management/helper-state";
import { BusinessTitles } from "../../atom/businessTitles";
import { SidebarItem } from "../../organisms/AITools";
import { Automation } from "../../organisms/automation";
import styles from "./sidebar.module.css";
import { useEffect, useState } from "react";
import { UserBusinessInfoTypes } from "@/app/ts/types";
import { layoutSizes } from "@/data/layout";

interface TestSideBarProps {
  data: UserBusinessInfoTypes;
}

export const Sidebar: React.FC<TestSideBarProps> = ({ data }: any) => {
  const [showSideBar] = useSideBarVisibility();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > layoutSizes.ipad.width) setIsDesktop(true);
  }, []);
  return (
    <div
      className={`${styles["Container"]} ${
        !showSideBar && !isDesktop ? styles["hide-sidebar"] : ""
      }`}
    >
      <div className={styles["Sidebar"]}>
        <BusinessTitles businessInfoData={data} />
        <SidebarItem label="AI TOOLS" />
        <Automation label="AUTOMATION" />
      </div>
    </div>
  );
};
