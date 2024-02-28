"use client";
import styles from "./styles/schedule-ad.module.css";
import { useGeneratedContentState } from "@/app/state-management/adPromotionContext";
import { useSelectedAds } from "@/app/state-management/helper-state";
import { ReactNode, MouseEvent, useState } from "react";


interface ScheduleAdPostProps {
  components: { [key: number]: ReactNode };
}
export const ScheduleAdPostConponent: React.FC<ScheduleAdPostProps> = ({
  components,
}) => {
  const [navCount, setNavCount] = useState(1);
  const [ads] = useGeneratedContentState();
  const [selectedAds] = useSelectedAds();

  const handleNavigation = (count: number) => {
    setNavCount(count);
  };

  return (
    <div className={styles["Container"]}>
      <Navigation
        navAction={handleNavigation}
        navCount={navCount}
        adCount={ads.length}
        selectedAdCount={selectedAds.length}
      />
      <div className={styles["AdListingContainer"]}>{components[navCount]}</div>
    </div>
  );
};

interface NavigationProps {
  navAction: (count: number) => void;
  navCount: number;
  adCount?: number;
  selectedAdCount: number;
}

const Navigation: React.FC<NavigationProps> = ({
  navAction,
  navCount,
  selectedAdCount,
  adCount,
}) => {
  const handleNavigation = (event: MouseEvent<HTMLButtonElement>) => {
    const dataId = event.currentTarget.getAttribute("data-id");
    navAction(parseInt(dataId!));
  };

  const generateClassName = (index: number) => {
    return `${styles["Navigation-item"]} ${
      navCount === index && styles["Active"]
    }`;
  };

  const buttons = [
    { label: "all ads", count: adCount },
    { label: "social platform", count: undefined },
    { label: "selected ads", count: selectedAdCount },
  ];

  return (
    <div className={styles["Navigation-container"]}>
      <div className={styles["Navigation-wrapper"]}>
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={handleNavigation}
            className={generateClassName(index)}
            data-id={index}
          >
            {button.label && <span>{button.label}</span>}
            {button.count !== undefined && (
              <span className={styles["Navigation-item-count"]}>
                {button.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
