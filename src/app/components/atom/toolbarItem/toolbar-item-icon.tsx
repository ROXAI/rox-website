import styles from "./toolbar-item.module.css";
import Image from "next/image";

interface ToolbarItemIconProps {
  icon: any;
}
export const ToolbarItemIcon: React.FC<ToolbarItemIconProps> = ({ icon }) => {
  return (
    <Image
      width={35}
      height={30}
      alt={"icon"}
      src={icon}
      className={styles["ItemIcon"]}
    />
  );
};
