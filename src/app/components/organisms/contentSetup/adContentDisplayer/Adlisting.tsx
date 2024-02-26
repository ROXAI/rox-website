"use client";
import { useGeneratedContentState } from "@/app/state-management/adPromotionContext";
import { AdContentItem } from ".";
import { apiRoutes } from "@/data/routes";
import { userBusinessInfoState } from "@/app/state-management/context";
import { useEffect, useState } from "react";
import { useApiQuery } from "@/app/hooks/apiQuery";

 const AdListing = () => {
  const [{ currentSelection }] = userBusinessInfoState();
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
    <div>
      {ads?.map((ad) => (
        <AdContentItem key={ad._id} text={ad.text} id={ad._id} />
      ))}
    </div>
  );
};

export default AdListing; 