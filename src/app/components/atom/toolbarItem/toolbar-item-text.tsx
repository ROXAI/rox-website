import styles from "./toolbar-item.module.css";
interface ItemtextProps {
  text: string;
}

export const Itemtext: React.FC<ItemtextProps> = ({ text }) => {
  return <div className={styles["ItemText"]}>{text}</div>;
};
