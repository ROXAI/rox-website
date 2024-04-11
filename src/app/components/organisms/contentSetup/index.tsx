"use client";
import React, { ReactNode } from "react";
import styles from "./content-setup.module.css";
import { ContentControl } from "./contentControls";
import { AdContentDisplay, AdContentItem } from "./adContentDisplayer";
import { SpinnerComponent } from "../../atom/spinner";
import { useGenerateContent } from "@/app/hooks/generateContent";
interface ContentSetupProps {
  children?: ReactNode;
}
export const ContentSetup: React.FC<ContentSetupProps> = () => {
  const { adContent, generateContentStatus, error } = useGenerateContent();

  if (generateContentStatus === "completed") {
    return (
      <div className={styles["Container"]}>
        <ContentControl />
        {adContent?.map((item) => (
          <AdContentItem key={item._id} text={item.text} id={item._id} />
        ))}
      </div>
    );
  }

  if (generateContentStatus === "loading") {
    return (
      <div className={styles["Container"]}>
        <ContentControl />
        <div className={styles["Loader"]}>
          <SpinnerComponent />
        </div>
      </div>
    );
  }

  if (generateContentStatus === "error") {
    return (
      <div className={styles["Container"]}>
        <ContentControl />
        <div className={styles["Loader"]}>
          <div>
            <span>something went wrong, please try again leter</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles["Container"]}>
        <ContentControl />
        <AdContentDisplay />
      </div>
    </>
  );
};
