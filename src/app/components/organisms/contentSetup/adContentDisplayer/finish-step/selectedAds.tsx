"use client";
import { Button } from "@/app/components/atom/CTA";
import { SetupCard } from "../../../cards/setupCard";
import { Heading1 } from "@/app/components/atom/typography";
import { updateBusinessProfile } from "@/app/Actions/business-operations";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FinishStep = () => {
  const [disable, setDisable] = useState(false);
  const { push } = useRouter();
  
  const saveAutomationSettiongs: any = async () => {
    setDisable(true);
    try {
      await updateBusinessProfile({ postingStatus: "STANDARD" });
      push("/dashboard");
    } catch (error: any) {
      setDisable(false);
      alert("something went wrong, try again");
      console.error(error);
    }
  };

  return (
    <div>
      <Heading1 text="finish your setup" />
      <SetupCard imgUrl="/Runner-finishing.svg">
        <Button
          type="button"
          text="save"
          disabled={disable}
          handler={saveAutomationSettiongs}
        />
      </SetupCard>
    </div>
  );
};

export default FinishStep;
