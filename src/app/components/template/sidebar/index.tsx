"use server"
import { BusinessTitles } from "../../atom/businessTitles";
import { SidebarItem } from "../../organisms/AITools";
import { Automation } from "../../organisms/automation";
import styles from "./sidebar.module.css";

export const Sidebar = async () => {
  return (
    <div className={styles["Sidebar"]}>
      <BusinessTitles />
      <SidebarItem label="AI TOOLS" />
      <Automation label="AUTOMATION" />
    </div>
  );
};
