import styles from "./toolsbar-label.module.css";

interface AIToolsLabelProps {
  label: string;
}

export const ToolsbarLabel: React.FC<AIToolsLabelProps> = ({ label }) => (
  <div className={styles["Container"]}>{label}</div>
);
