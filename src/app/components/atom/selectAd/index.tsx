"use client";
import { BiSelectMultiple, BiSolidSelectMultiple } from "react-icons/bi";
import { useSelectedAds } from "@/app/state-management/helper-state";
import styles from "./select-ad.module.css";
import { useGenerateContent } from "@/app/hooks/generateContent";

interface SelectAdProps {
  adContentId: string;
}
export const SelectAd: React.FC<SelectAdProps> = ({ adContentId }) => {
  const [selectedAds] = useSelectedAds();
  const { handleSelectAds } = useGenerateContent();
  const isSelected = selectedAds.find((item) => item._id === adContentId);

  return (
    <button
      className={styles["addContainer-select"]}
      onClick={() => handleSelectAds(adContentId)}
    >
      {isSelected ? (
        <BiSolidSelectMultiple size={30} />
      ) : (
        <BiSelectMultiple size={30} />
      )}
    </button>
  );
};
