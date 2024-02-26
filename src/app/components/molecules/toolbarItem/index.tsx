import { Itemtext, ToolbarItemIcon } from "../../atom/toolbarItem";
import styles from "./tool-bar-item.module.css";

interface ToolbartItemProps {
  icon: any;
  text: string;
}
export const ToolbartItem:React.FC<ToolbartItemProps> = ({icon, text}) => {
  return (
    <div className={styles["Wrapper"]}>
      <ToolbarItemIcon icon={icon} />
      <Itemtext text={text} />
    </div>
  );
};
