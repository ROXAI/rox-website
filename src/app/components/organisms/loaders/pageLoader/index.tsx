import styles from "./loader.module.css";
export default function PageLoader() {
  return (
    <div className={styles["Container"]}>
      <div className={styles["spinner"]}></div>
    </div>
  );
}
