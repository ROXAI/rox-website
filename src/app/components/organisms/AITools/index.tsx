import styles from "./sidebar-item.module.css";
import face_generator from "../../../../../public/icons8-face-generator-94 1.svg";
import clock from "../../../../../public/Clock.svg";
import { ToolsbarLabel } from "../../atom/toolsbarLabel";
import { ToolbartItem } from "../../molecules/toolbarItem";
import { useNavigation } from "@/app/hooks/ui/navigation";

interface SidebarItemProps {
  label: string;
  mgTop?: number;
}
export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  mgTop = 5,
}) => {
  const { navigate } = useNavigation();
  return (
    <div className={styles["Container"]} style={{ marginTop: `${mgTop}rem` }}>
      <ToolsbarLabel label={label} />

      <ToolbartItem
        icon={face_generator}
        text="generate ads"
        handler={() => navigate("/dashboard/content_generator")}
      />

      <ToolbartItem
        icon={clock}
        text="schedule ad post"
        handler={() => navigate("/dashboard/schedule_ad_post")}
      />
    </div>
  );
};
