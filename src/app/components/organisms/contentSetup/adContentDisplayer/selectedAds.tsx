"use client";

import { useApiQuery } from "@/app/hooks/apiQuery";
import { userBusinessInfoState } from "@/app/state-management/context";
import { useSelectedAds } from "@/app/state-management/helper-state";
import { apiRoutes } from "@/data/routes";
import { useEffect, useState } from "react";
import { AdContentItem } from ".";

const SelectedAdListing = () => {
  const [{ currentSelection }] = userBusinessInfoState();
  const [selectedAds, setSelectedAds] = useSelectedAds();
  const [error, setError] = useState("");
  const query = useApiQuery();

  const getSelectedAds = async () => {
    try {
      const url = apiRoutes.adContent.getSelectedAds;
      const res = await query(`${url}?_id=${currentSelection?._id || ""}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error);
        return false;
      }

      setSelectedAds(data?.data);
      return true;
    } catch (error: any) {
      setError(error);
      alert("something went wrong, try again");
      return false;
    }
  };

  useEffect(() => {
    if (selectedAds.length === 0) getSelectedAds();
  }, []);

  if (error) return <span>an error occured</span>;
  if (selectedAds.length === 0) return <span>you dont have any ads</span>;
  return (
    <div>
      {selectedAds?.map((ad) => (
        <AdContentItem key={ad._id} text={ad.text} id={ad._id} />
      ))}
    </div>
  );
};

export default SelectedAdListing;
