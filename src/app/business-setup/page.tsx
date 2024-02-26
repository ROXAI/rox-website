"use client";
import { Button } from "../components/atom/CTA";
import { AlertComponent } from "../components/atom/alert";
import { InputField, TextAreaField } from "../components/molecules/inputField";
import { useBusinessProfileSetup } from "../hooks/businessProfile-setup";
import styles from "./business-setup.module.css";

export default function BusinessSetup() {
  const { businessProfileData, error, isDisabled, handleChange, createBusinessInfo } =
    useBusinessProfileSetup();
  return (
    <main className={styles["Container"]}>
      <form onSubmit={createBusinessInfo} className={styles["FormWrapper"]}>
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
    </main>
  );
}
