"use client";

import { IG_BusinessLogin } from "@/app/Actions/facebook/business-login";

interface InstagramCardProps {
  accountData: any;
}

const InstagramCard: React.FC<InstagramCardProps> = ({ accountData }) => {
  if (!accountData)
    return (
      <div>
        <h1>
          please connect your instagram account by clicking the button below
        </h1>
        <button onClick={() => IG_BusinessLogin()} type="button">
          login to meta suit
        </button>
      </div>
    );
  return (
    <div>
      <h2>welcome to instagram</h2>
    </div>
  );
};

export default InstagramCard;
