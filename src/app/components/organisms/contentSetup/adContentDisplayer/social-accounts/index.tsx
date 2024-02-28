import { InstagramMiniCard } from "@/app/components/template/socialAccounts/instagram";
import SocialCard from "../../../cards/socialCard";
import styles from "./social.module.css";
import { FacebookCard } from "@/app/components/template/socialAccounts/facebook";
import { Suspense } from "react";
const SocialAccounts = () => {
  return (
    <div className={styles["Container"]}>
      <Suspense fallback={<div>loading</div>}>
        <InstagramMiniCard />
      </Suspense>

      <FacebookCard />
      <SocialCard
        icon="/icons8-twitterx.svg"
        name="twitterX"
        accountStatus={false}
      />
    </div>
  );
};

export default SocialAccounts;
