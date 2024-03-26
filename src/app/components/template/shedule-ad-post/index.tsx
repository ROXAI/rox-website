"use client";
import styles from "./styles/schedule-ad.module.css";
import { ReactNode, useState } from "react";
import { InconStep1 } from "../../atom/icons/steps/step1";
import { Button } from "../../atom/CTA";

interface ScheduleAdPostProps {
  components: { [key: number]: ReactNode };
}

export const ScheduleAdPostConponent: React.FC<ScheduleAdPostProps> = ({
  components,
}) => {
  const [navCount, setNavCount] = useState(0);

  return (
    <div className={styles["Container"]}>
      <Navigation navCount={navCount} />
      <div>{components[navCount]}</div>
      <div className={styles["Btn-container"]}>
        <Button
          text="previouse"
          type="button"
          size="medium"
          handler={() => setNavCount((prevState) => prevState - 1)}
          disabled={navCount === 0}
        />
        <Button
          text="next"
          type="button"
          handler={() => setNavCount((prevState) => prevState + 1)}
          disabled={navCount === 2}
        />
      </div>
    </div>
  );
};

interface NavigationProps {
  navCount: number;
}

const Navigation: React.FC<NavigationProps> = ({ navCount }) => {
  return (
    <div className={styles["Navigation-container"]}>
      <div className={styles["Line"]}></div>
      <InconStep1 iconName="list" step={navCount === 0} />
      <InconStep1 iconName="accounts" step={navCount === 1} />
      <InconStep1 iconName="final" step={navCount === 2} />
    </div>
  );
};
