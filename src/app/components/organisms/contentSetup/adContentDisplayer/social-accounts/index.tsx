import { InstagramMiniCard } from "@/app/components/template/socialAccounts/instagram";
import SocialCard from "../../../cards/socialCard";
import styles from "./social.module.css";
import { FacebookCard } from "@/app/components/template/socialAccounts/facebook";
import { Suspense } from "react";
import { ContentBlock } from "@/app/components/molecules/text_block";
const SocialAccounts = () => {
  return (
    <>
      <div>
        <ContentBlock
          headingText="Connect & Share the Buzz!"
          paragraphText=" Link your preferred social media profile (Twitter, Instagram, etc.) to
          seamlessly schedule your tweets."
        />
      </div>
      <div className={styles["Container"]}>
        <Suspense fallback={<div>loading</div>}>
          <InstagramMiniCard />
        </Suspense>
        <Suspense fallback={<div>loading</div>}>
          <FacebookCard />
        </Suspense>
        <SocialCard
          icon="/icons8-twitterx.svg"
          name="twitterX"
          accountStatus={false}
        />
      </div>
    </>
  );
};

export default SocialAccounts;
