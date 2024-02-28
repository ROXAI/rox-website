import styles from "./styles/text-block.module.css";

interface TextBlockProps {
  title: string;
  description: string;
}
export const TextBlock: React.FC<TextBlockProps> = ({ title, description }) => {
  return (
    <div className={styles["Text-Block"]}>
      <span className={styles["Text-Block-Title"]}>{title}</span>
      <span className={styles["Text-Block-Title-desc"]}>{description}</span>
    </div>
  );
};
