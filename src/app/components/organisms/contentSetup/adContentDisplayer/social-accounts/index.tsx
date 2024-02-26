import SocialCard from "../../../cards/socialCard";
import styles from "./social.module.css";
const SocialAccounts = () => {
  return (
    <div className={styles["Container"]}>
      <SocialCard icon="/icons8-facebook.svg" name="facebook" />
      <SocialCard icon="/icons8-instagram.svg" name="instagram" />
      <SocialCard icon="/icons8-twitterx.svg" name="twitterX" />
    </div>
  );
};

export default SocialAccounts;
