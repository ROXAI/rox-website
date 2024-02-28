import { Icon } from "@/app/components/atom/icons";
import styles from "./social-card.module.css";
import Chip from "@/app/components/atom/chip";
import Link from "next/link";

interface SocialCardProps {
  icon: string;
  name: string;
  accountStatus: boolean;
}

const SocialCard: React.FC<SocialCardProps> = ({
  icon,
  name,
  accountStatus,
}) => {
  const account = accountStatus ? "connected" : "not connected";
  const copy = accountStatus ? "view account" : "connect account";
  return (
    <div className={styles["Container"]} data-theme="light">
      <div className={styles["Icon-text-wrapper"]}>
        <Icon width={100} height={100} alt="social media icon" icon={icon} />
        <div className={styles["Icon-text"]}>
          <span>{name}</span>
          <div>
            <span className={styles["Icon-text-item"]}>status</span>
            <Chip text={account} />
          </div>
        </div>
      </div>
      <div>
        <Link href={"/dashboard/social-accounts/instagram"}>
          <button className={styles["chip-btn"]}>{copy}</button>
        </Link>
      </div>
    </div>
  );
};

export default SocialCard;
