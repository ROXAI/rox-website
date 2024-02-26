// module
import { generateContentData } from "@/data";
import styles from "./add-content.module.css";
import commonStyles from "@/app/common_styles/pop-over.module.css";
import ai_img from "../../../../../../public/ai-generator-img.svg";
import { SimplePopper } from "@/app/components/atom/popOver";
import { useGenerateContent } from "@/app/hooks/generateContent";
import { EditAdContentForm } from "../edit_adContent";

// packages
import Image from "next/image";
import { SelectAd } from "@/app/components/atom/selectAd";
export const AdContentDisplay = () => {
  return (
    <>
      <div className={styles["Container-Item1-Wrapper"]}>
        <Image src={ai_img} alt="ia logo" />
        <p className={styles["PlaceHolderText"]}>
          {generateContentData.placeholdertext}
        </p>
      </div>
    </>
  );
};

type AdContentItemProps = {
  text: string;
  id: string;
};
export const AdContentItem: React.FC<AdContentItemProps> = ({ text, id }) => {
  const { handleEditAdContent, DeleteAdContentApiCall } = useGenerateContent();
  return (
    <div className={styles["addContainer"]}>
      <div className={styles["addContainer-edit-wrapper"]}>
        <div className={styles["addContainer-edit"]}>
          <SimplePopper>
            <div className={commonStyles["PopOverContainer"]}>
              <div
                className={commonStyles["PopOverItem"]}
                onClick={() =>
                  handleEditAdContent({
                    component: <EditAdContentForm />,
                    _id: id,
                    text: text,
                  })
                }
              >
                edit
              </div>
              <div
                className={commonStyles["PopOverItem"]}
                onClick={() => DeleteAdContentApiCall(id)}
              >
                delete
              </div>
            </div>
          </SimplePopper>
        </div>
        <SelectAd adContentId={id} />
      </div>
      <div>
        <span>{text}</span>
      </div>
    </div>
  );
};
