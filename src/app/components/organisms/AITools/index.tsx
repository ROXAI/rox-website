import styles from "./sidebar-item.module.css";

import face_generator from "../../../../../public/icons8-face-generator-94 1.svg";
import clock from "../../../../../public/Clock.svg";
import { ToolsbarLabel } from "../../atom/toolsbarLabel";
import { ToolbartItem } from "../../molecules/toolbarItem";
import Link from "next/link";

interface SidebarItemProps {
  label: string;
  mgTop?: number;
}
export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  mgTop = 5,
}) => {
  return (
    <div className={styles["Container"]} style={{ marginTop: `${mgTop}rem` }}>
      <ToolsbarLabel label={label} />
      <Link href={"/dashboard/content_generator"}>
        <ToolbartItem icon={face_generator} text="generate ads" />
      </Link>
      <Link href={"/dashboard/schedule_ad_post"}>
        <ToolbartItem icon={clock} text="schedule ad post" />
        </Link>
    </div>
  );
};
