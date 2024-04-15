"use client";
import styles from "./ad-listing.module.css";
import { useGeneratedContentState } from "@/app/state-management/adPromotionContext";
import { AdContentItem } from "..";
import { apiRoutes } from "@/data/routes";
import { useBusinessInfoState } from "@/app/state-management/context";
import { useEffect, useState } from "react";
import { useApiQuery } from "@/app/hooks/apiQuery";
import { ContentBlock } from "@/app/components/molecules/text_block";

const AdListing = () => {
  const [{ currentSelection }] = useBusinessInfoState();
  const [ads, setAds] = useGeneratedContentState();
  const [error, setError] = useState("");
  const query = useApiQuery();

  const getAds = async () => {
    try {
      const url = apiRoutes.adContent.getAds;
      const res = await query(`${url}?_id=${currentSelection?._id || ""}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error);
        return false;
      }

      setAds(data?.data);
      return true;
    } catch (error: any) {
      setError(error);
      alert("something went wrong, try again");
      return false;
    }
  };

  useEffect(() => {
    if (ads.length === 0) getAds();
  }, []);

  if (error) return <span>an error occured</span>;
  if (ads.length === 0) return <span>you dont have any ads</span>;

  return (
    <>
      <div>
        <ContentBlock headingText="Your Scheduled Tweets">
          Here's a handy list of all your drafted tweets ready to be posted.
          Feel free to click the check box next to any tweet to make edits or
          remove it from the schedule.
        </ContentBlock>
      </div>
      <div className={styles["AdListingContainer"]}>
        {ads?.map((ad) => (
          <AdContentItem key={ad._id} text={ad.text} id={ad._id} />
        ))}
      </div>
    </>
  );
};

export default AdListing;
