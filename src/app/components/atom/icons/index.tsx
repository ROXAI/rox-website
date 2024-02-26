import Image from "next/image";
import styles from "./icons.module.css";
import { MdOutlineModeEditOutline } from "react-icons/md";

interface EditIconProps {
  handler?: () => void;
}
export const EditIcon: React.FC<EditIconProps> = ({ handler }) => {
  return (
    <div onClick={handler} className={styles["Edit"]}>
      <MdOutlineModeEditOutline />
      <span>Edit</span>
    </div>
  );
};

interface IconTextProps {
  text: string;
  editiable?: boolean;
  handler?: () => void;
}
export const IconText: React.FC<IconTextProps> = ({
  text,
  editiable,
  handler,
}) => {
  return (
    <span className={styles["IconText"]}>
      {text} {editiable && <span onClick={handler}>X</span>}
    </span>
  );
};

export const Icon = ({
  icon,
  alt = "icon",
  width,
  height,
}: {
  icon: string;
  alt: string;
  width: number;
  height: number;
}) => {
  return <Image width={width} height={height} alt={alt} src={icon} />;
};
