import { BusinessProfile } from "../businessProfile";
import styles from "./dashboard-canva.module.css";

export const DashboardCanvas = () => {
  return (
    <div className={styles["Container"]}>
      <BusinessProfile />
    </div>
  );
};
