import { Itemtext, ToolbarItemIcon } from "../../atom/toolbarItem";
import styles from "./tool-bar-item.module.css";

interface ToolbartItemProps {
  icon: any;
  text: string;
  handler?: () => void
}
export const ToolbartItem:React.FC<ToolbartItemProps> = ({icon, text, handler}) => {
  return (
    <div className={styles["Wrapper"]} onClick={handler}>
      <ToolbarItemIcon icon={icon} />
      <Itemtext text={text} />
    </div>
  );
};
