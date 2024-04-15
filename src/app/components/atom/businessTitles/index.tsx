import { UserBusinessInfoTypes } from "@/app/ts/types";
import { DropdownComponent } from "../../organisms/dropdown";

interface BusinessList {
  businessInfoData: UserBusinessInfoTypes;
}

export const BusinessTitles: React.FC<BusinessList> = ({
  businessInfoData,
}) => {
  return <DropdownComponent data={businessInfoData} />;
};
