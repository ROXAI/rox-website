import styles from "./dashboard-canva.module.css";
import { BusinessInfo } from "../../organisms/businessBioData";
import { Heading1 } from "../../atom/typography";
import { ContentSetup } from "../../organisms/contentSetup";

export const ContentGeneratorCanva = () => {
  return (
    <div className={styles["Container"]}>
      <div className={styles["Content"]}>
        <BusinessInfo />
        <div className={styles["Content-Box"]}>
          <Heading1 text="Generate Content For Social Media" />
          <ContentSetup />
        </div>
      </div>
    </div>
  );
};
