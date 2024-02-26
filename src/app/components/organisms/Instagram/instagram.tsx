"use client";

import { FB_BusinessLogin } from "@/app/Actions/facebook/business-login";

const InstagramCard = () => {
  return (
    <div>
      <h2>instagram login</h2>
      <button onClick={() => FB_BusinessLogin()} type="button">
        login to meta suit
      </button>
    </div>
  );
};

export default InstagramCard;
