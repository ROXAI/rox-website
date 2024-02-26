import { BusinessInfo } from "../../organisms/businessBioData";
import { ProductListing } from "../../organisms/businessProducts/Products";
import { ServiceListing } from "../../organisms/businessServices/Services";
import styles from "./business-profile.module.css";

export const BusinessProfile = () => {
  return (
    <div className={styles["Container"]}>
      <h1 className={styles["Title"]}>Business Profile</h1>
      <div className={styles["Content"]}>
        <BusinessInfo />
        <ProductListing />
        <ServiceListing />
      </div>
    </div>
  );
};
