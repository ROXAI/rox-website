"use client";
import styles from "./styles.module.css";
import { IG_BusinessLogin } from "@/app/Actions/facebook/business-login";
import { CTA } from "../../atom/CTA";
import Image from "next/image";
import { SocialAccount } from "@/app/ts/interface";
import { TextBlock } from "../../molecules/text_block";

interface InstagramCardProps {
  accountData: SocialAccount;
}

const InstagramCard: React.FC<InstagramCardProps> = ({ accountData }) => {
  const accountStatus = accountData?.isConnected
    ? "connected"
    : "not connected";
  const accessStatus = accountData?.tokenManager?.isValid ? "valid" : "expired";
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
    <div className={styles["Account-Card-Wrapper"]}>
      <div className={styles["Account-Card"]}>
        <Image
          src={"/icons8-instagram.svg"}
          alt="instagram icon"
          width={100}
          height={100}
        />
        <div className={styles["Text-Block-Wrapper"]}>
          <TextBlock title="account status" description={accountStatus} />
          <TextBlock title="access status" description={accessStatus} />
        </div>
      </div>
      {accessStatus === "expired" && (
        <div className={styles["Connect"]}>
          <p>
            access to your Instagram account has expired, click the button to
            re-authenticate
          </p>
          <CTA type="button" handler={() => IG_BusinessLogin()}>
            reconnect
          </CTA>
        </div>
      )}
    </div>
  );
};

export default InstagramCard;
