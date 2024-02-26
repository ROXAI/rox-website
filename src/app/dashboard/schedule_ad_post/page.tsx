"use client";
import { MouseEvent, useState } from "react";
import styles from "./schedule-ad.module.css";
import dynamic from "next/dynamic";
import { useGeneratedContentState } from "@/app/state-management/adPromotionContext";
import { useSelectedAds } from "@/app/state-management/helper-state";

const AdListing = dynamic(
  () =>
    import(
      "@/app/components/organisms/contentSetup/adContentDisplayer/Adlisting"
    )
);
const SocialAccounts = dynamic(
  () =>
    import(
      "@/app/components/organisms/contentSetup/adContentDisplayer/social-accounts"
    )
);
const SelectedAdListing = dynamic(
  () =>
    import(
      "@/app/components/organisms/contentSetup/adContentDisplayer/selectedAds"
    )
);

const ScheduleAdPost = () => {
  const [navCount, setNavCount] = useState(1);
  const [ads] = useGeneratedContentState();
  const [selectedAds] = useSelectedAds();

  interface Con {
    [key: number]: any;
  }
  const components: Con = {
    0: <AdListing />,
    1: <SocialAccounts />,
    2: <SelectedAdListing />,
  };

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

export default ScheduleAdPost;
