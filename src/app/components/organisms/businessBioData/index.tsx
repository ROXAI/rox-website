"use client";
import styles from "./business-bio-data.module.css";
import { Paragraph, Title } from "../../atom/typography";
import { EditIcon } from "../../atom/icons";
import { useBusinessProfileSetup } from "@/app/hooks/businessProfile-setup";
import { userBusinessInfoState } from "@/app/state-management/context";

export const BusinessInfo = () => {
  const { openBusinessInfoForm } = useBusinessProfileSetup();
  const [{ currentSelection }] = userBusinessInfoState();
  const { _id, businessName, description } = currentSelection;
  return (
    <>
      <div className={styles["Container"]}>
        <div className={styles["TextWrapper"]}>
          <Title text={businessName} />
          <Paragraph text={description} />
        </div>
        <div>
          <EditIcon
            handler={() =>
              openBusinessInfoForm({ businessName, description, _id })
            }
          />
        </div>
      </div>
    </>
  );
};
