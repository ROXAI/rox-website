import { InstagramCard } from "@/app/components/template/socialAccounts/instagram";
import SocialCard from "../../../cards/socialCard";
import styles from "./social.module.css";
import { FacebookCard } from "@/app/components/template/socialAccounts/facebook";
const SocialAccounts = () => {
  return (
    <div className={styles["Container"]}>
      <InstagramCard />
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
