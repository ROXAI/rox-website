"use client";
import { IoClose } from "react-icons/io5";
import styles from "./businessprofileform.module.css";
import { useBusinessProfileSetup } from "@/app/hooks/businessProfile-setup";
import { InputField, TextAreaField } from "../../molecules/inputField";
import { Button } from "../../atom/CTA";
import { AlertComponent } from "../../atom/alert";

export const BusinessProfileForm = () => {
  const {
    closeForm,
    handleChange,
    updateBusinessInfo,
    businessProfileData,
    error,
    isDisabled,
    formStatus,
  } = useBusinessProfileSetup();
  if (!formStatus) return;
  
  return (
    <div className={styles["Container"]}>
      <div className={styles["Form-Container"]}>
        <span onClick={closeForm}>
          <IoClose className={styles["Close"]} />
        </span>

        <form onSubmit={updateBusinessInfo}>
          <InputField
            label="Business Name"
            value={businessProfileData.businessName}
            name="businessName"
            onChange={handleChange}
          />

          <TextAreaField
            label="Business Description"
            value={businessProfileData.description}
            name="description"
            onChange={handleChange}
          />
          <div className={styles["loginAlertWrapper"]}>
            <Button text="send" type="submit" disabled={isDisabled} />
            {error && <AlertComponent errorMessage={error} />}
          </div>
        </form>
      </div>
    </div>
  );
};
