import styles from "./chip.module.css";
const Chip = ({ text }: { text: string }) => {
  return <span className={styles["Chip"]}>{text}</span>;
};

export default Chip;
