"use client";
import styles from "./styles.module.css";
import { IG_BusinessLogin } from "@/app/Actions/facebook/business-login";
import { CTA } from "../../atom/CTA";
import Image from "next/image";
import { SocialAccount } from "@/app/ts/interface";

interface InstagramCardProps {
  accountData: SocialAccount;
}

const InstagramCard: React.FC<InstagramCardProps> = ({ accountData }) => {
  if (!accountData)
    return (
      <div className={styles["Container"]}>
        <Image
          src={"/no-connection.svg"}
          alt="connect icon"
          width={100}
          height={100}
          className={styles["Icon-container"]}
        />

        <h1>
          your instagram account is not connected, click the buttion below to
          connect your account
        </h1>
        <CTA type="button" handler={() => IG_BusinessLogin()}>
          connect account
        </CTA>
      </div>
    );
  return (
    <div className={styles["Account-Card"]}>
      <h2>welcome to instagram</h2>
    </div>
  );
};

export default InstagramCard;
