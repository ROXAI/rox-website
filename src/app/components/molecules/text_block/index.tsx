import styles from "./styles/text-block.module.css";
import sasStyles from "./styles/text_block.module.scss";

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

interface ContentBlockProps {
  headingText: string;
  paragraphText: string;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({
  headingText,
  paragraphText,
}) => {
  return (
    <div className={sasStyles["Container"]}>
      <h1 className={sasStyles["Heading"]}>{headingText}</h1>
      <p className={sasStyles["Desc"]}>{paragraphText}</p>
    </div>
  );
};
