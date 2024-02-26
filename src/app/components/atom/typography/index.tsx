import styles from "./typography.module.css";

interface TitleProps {
  text: string;
  size?: "small" | "medium" | "big";
}

export const Title: React.FC<TitleProps> = ({ text, size }) => {
  const fontSide = size === "medium" ? 1.3 : size === "big" ? 1.5 : 1.2;
  return (
    <h2 className={styles["Title"]} style={{ fontSize: `${fontSide}rem` }}>
      {text}
    </h2>
  );
};

export const Heading1: React.FC<TitleProps> = ({ text, size }) => {
  const fontSide = size === "medium" ? 1.4 : size === "big" ? 1.5 : 1.3;
  return (
    <h2 className={styles["Title"]} style={{ fontSize: `${fontSide}rem` }}>
      {text}
    </h2>
  );
};

export const Paragraph: React.FC<TitleProps> = ({ text }) => {
  return <p className={styles["Paragraph"]}>{text}</p>;
};
