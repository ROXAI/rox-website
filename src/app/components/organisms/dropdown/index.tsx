"use client";
import { useBusinessOperations } from "@/app/hooks/user-business-operations";
import { userBusinessInfoState } from "@/app/state-management/context";
import { useBusinessProfileState } from "@/app/state-management/helper-state";
import { UserBusinessInfoTypes } from "@/app/ts/types";
import { Dropdown } from "keep-react";
import { useRouter } from "next/navigation";
import { SignOut } from "phosphor-react";
import { useEffect } from "react";

interface DropdownComponentProps {
  data: UserBusinessInfoTypes
}

export const DropdownComponent: React.FC<DropdownComponentProps> = ({
  data,
}) => {
  const { retrieveBusinessData } = useBusinessOperations();
  const [businessInfo, setBusinessInfo] = userBusinessInfoState();
  const [_, setBusinessProfileData] = useBusinessProfileState();
  const { push, prefetch } = useRouter();
  const handleChange = () => {
    setBusinessProfileData({ businessName: "", description: "", _id: "" });
    push("/business-setup");
  };
const { currentSelection, businessInfoData } = businessInfo
  useEffect(() => {
    setBusinessInfo(data);
    prefetch("/business-setup");
  }, [data]);

  return (
    <Dropdown
      label={currentSelection.businessName}
      type="primary"
      size="sm"
      dismissOnClick={true}
    >
      {/* we mapped here because "Dropdown.Item" most be a direct child of Dropdown */}
      {businessInfoData?.map(({ businessName, _id }) => (
        <Dropdown.Item onClick={() => retrieveBusinessData(_id)} key={_id}>
          {businessName}
        </Dropdown.Item>
      ))}

      <Dropdown.Item
        onClick={handleChange}
        icon={<SignOut size={20} color="#5E718D" />}
      >
        add business account
      </Dropdown.Item>
    </Dropdown>
  );
};
